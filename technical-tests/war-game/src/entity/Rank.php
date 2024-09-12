<?php

namespace WarGame\Entity;

use WarGame\Entity\Card;

abstract class Rank implements IRank
{
    protected $values = [];

    public function battleWinner(array $cardsPlayByPlayer, array $values): int
    {
        $cardsPlay = [];
        foreach ($cardsPlayByPlayer as $playerId => $cardPlayByPlayer) {
            $cardsPlay[$playerId] = array_pop($cardPlayByPlayer);
        }

        uasort($cardsPlay, function (Card $cardA, Card $cardB) use ($values) {
            $positionOfCardAValue = array_search($cardA->getValue(), $values);
            $positionOfCardBValue = array_search($cardB->getValue(), $values);
            return $positionOfCardAValue > $positionOfCardBValue;
        });
        reset($cardsPlay);

        return key($cardsPlay);
    }

    public function sumRankOfCards(array $cardsPlay): int
    {
        $rankOfCards = 0;

        /** @var Card $card */
        foreach ($cardsPlay as $card) {
            $rankOfCards += array_search($card->getValue(), $this->getValues());
        }

        return $rankOfCards;
    }
}
