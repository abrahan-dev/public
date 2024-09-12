<?php

namespace WarGame;

use WarGame\Entity\Card;
use WarGame\Entity\Deck;
use WarGame\Entity\Player;
use WarGame\Entity\Rank;
use WarGame\Entity\Rank\RankLong;

require __DIR__ . '/vendor/autoload.php';

class WarGame extends Card
{
    protected $players;
    protected $deck;
    protected $rank;

    public function __construct(array $players, Deck $deck, Rank $rank)
    {
        $this->players = $players;
        $this->deck = $deck;
        $this->rank = $rank;
    }

    public function run()
    {
        try {
            $this->deck->divide($this->players);
            $this->play();
            $this->printMessage("THE WINNER IS: PLAYER ".$this->winner().PHP_EOL);
        } catch (\Exception $e) {
            $today = date('Y-m-d');
            $now = date('H:i:s');
            file_put_contents(
                __DIR__ .'/logs/'.$today.'.log',
                $now.' '.$e->getMessage().PHP_EOL,
                FILE_APPEND
            );
        }
    }

    /**
     * This recursive function is called while the players hold cards to play.
     * A hand can be a BATTLE or a WAR.
     * BATTLE: The cards are different.
     * WAR: The cards are the same.
     * @param array $cardsPlay The hand
     * @param int $play The number of hands
     * @return bool false when the game is over
     */
    public function play($cardsPlay = [], &$play = 0)
    {
        $play++;
        $this->printMessage(PHP_EOL."PLAY ".$play);

        if (!$this->thereAreCardsToPlay($cardsPlay)) {
            return false;
        }

        $cardsPlay = $this->takeCardsToPlay($cardsPlay);

        if ($this->isWar($cardsPlay)) {
            $this->printMessage("IS WAR");
            if ($this->eachPlayerHasAtLeastOneCard($this->players)) {
                $cardsPlay = $this->takeCardsToPlay($cardsPlay);
            }
            $this->play($cardsPlay, $play);
        } else {
            $this->printMessage("IS BATTLE");
            $battleWinner = $this->rank->battleWinner(
                $cardsPlay,
                $this->rank->getValues()
            );
            $this->printMessage('Player '.$battleWinner.' wins');
            $this->players[$battleWinner]->take($cardsPlay);
            $this->play([], $play);
        }
    }

    /**
     * Whether is possible to play another hand.
     * If not, the last hand must be resolved.
     * @param $cardsPlay
     * @return bool
     */
    public function thereAreCardsToPlay($cardsPlay): bool
    {
        if (!$this->eachPlayerHasAtLeastOneCard($this->players)) {
            $this->resolveLastCardPlay($cardsPlay);
            if (!$this->eachPlayerHasAtLeastOneCard($this->players)) {
                $this->printMessage("The players run out of cards.");
                return false;
            }
        }

        return true;
    }

    /**
     * It figures out the winner according to the number of cards.
     * @return int
     */
    protected function winner(): int
    {
        uasort($this->players, function (Player $playerA, Player $playerB) {
            return count($playerA->cards) < count($playerB->cards);
        });
        reset($this->players);

        return key($this->players);
    }

    /**
     * It resolves the last hand if there is no more cards available.
     * After resolving the last hand, the winner could have cards again, allowing the game to be continued.
     * @param $cardsPlayByPlayer
     * @return int|null|string
     */
    protected function resolveLastCardPlay($cardsPlayByPlayer)
    {
        $lastCardPlayWinnerId = null;
        $pointsByPlayer = [];

        foreach ($cardsPlayByPlayer as $playerId => $cardsPlay) {
            $pointsByPlayer[$playerId] = $this->rank->sumRankOfCards($cardsPlay);
        }

        asort($pointsByPlayer);
        $isTie = count(array_unique($pointsByPlayer)) === 1;
        if ($isTie) {
            $this->printMessage("Last CardPLay is tie");
        } else {
            $lastCardPlayWinnerId = key($pointsByPlayer);
            if ($lastCardPlayWinnerId) {
                $this->players[$lastCardPlayWinnerId]->take($cardsPlayByPlayer);
            }
        }

        return $lastCardPlayWinnerId;
    }

    /**
     * It takes one card of the beginning of the pile, per player.
     * @param array $cardsPlay The hand being played. Empty unless is WAR.
     * @return array
     */
    protected function takeCardsToPlay($cardsPlay = []): array
    {
        foreach ($this->players as $player) {
            $cardPlay = array_shift($player->cards);
            $cardsPlay[$player->getId()][] = $cardPlay;
            $this->printMessage('Player '.$player->getId().' plays '.$cardPlay->getValue());
        }

        return $cardsPlay;
    }

    /**
     * It figures out if it is WAR.
     * WAR means that all the cards of a hand have the same value.
     * @param $cardsPlayByPlayer
     * @return bool
     */
    protected function isWar($cardsPlayByPlayer): bool
    {
        $value = null;
        $isWar = true;
        $cardsPlay = [];

        foreach ($cardsPlayByPlayer as $cardPlayByPlayer) {
            $cardsPlay[] = array_pop($cardPlayByPlayer);
        }

        foreach ($cardsPlay as $cardPlay) {
            if (empty($value)) {
                $value = $cardPlay->getValue();
                continue;
            } else {
                $isWar &= $value == $cardPlay->getValue();
                $value = $cardPlay->getValue();
            }
        }

        return $isWar;
    }

    protected function eachPlayerHasAtLeastOneCard(array $players): bool
    {
        $thereAreCardsPlay = true;
        foreach ($players as $player) {
            $thereAreCardsPlay &= count($player->cards) != 0;
        }

        return $thereAreCardsPlay;
    }

    protected function printMessage($message)
    {
        echo PHP_EOL.$message;
    }
}

$players = [
    0 => new Player(0),
    1 => new Player(1),
];
$rankLong = new RankLong();
$deck = new Deck($rankLong);

$battleGame = new WarGame($players, $deck, $rankLong);
$battleGame->run();
