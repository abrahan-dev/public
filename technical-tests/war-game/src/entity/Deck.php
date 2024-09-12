<?php

namespace WarGame\Entity;

use WarGame\Entity\IRank;

class Deck
{
    protected $cards = [];
    protected $rank;

    public function __construct(IRank $rank)
    {
        $this->rank = $rank;
        $this->cards = $this->createCards(
            $rank->getValues(),
            $rank::NUMBER_OF_CARDS
        );
    }

    public function getCards(): array
    {
        return $this->cards;
    }

    /**
     * It creates a deck for a given number of cards and a given rank values.
     * The rank values are repeated until having a complete deck.
     *
     * @param $rankValues
     * @param $numberOfCards
     * @return array
     */
    public function createCards(array $rankValues, int $numberOfCards): array
    {
        $cards = [];
        $values = $rankValues;

        for ($i = $numberOfCards; $i > 0; $i--) {
            if (empty($values)) {
                $values = $rankValues;
            }
            $value = array_shift($values);
            $cards[] = new Card($value);
        }

        shuffle($cards);

        return $cards;
    }

    /**
     * Divide the deck between the players.
     * The cards are held by the players after division.
     *
     * @param Player[] $players
     * @throws \Exception
     */
    public function divide(array &$players)
    {
        $numberOfCards = count($this->cards);
        $numberOfPlayers = count($players);
        if ($numberOfCards < $numberOfPlayers) {
            throw new \Exception("The number of cards must be greater than the number of players");
        }
        $chunks = $numberOfCards / $numberOfPlayers;
        $cardsChunks = array_chunk($this->cards, $chunks);

        foreach ($players as $id => $player) {
            if ($player instanceof Player) {
                $player->cards = $cardsChunks[$id];
            } else {
                throw new \Exception('The player is not an entity of Player');
            }
        }
    }
}
