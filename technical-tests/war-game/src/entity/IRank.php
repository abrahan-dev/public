<?php

namespace WarGame\Entity;

interface IRank
{
    const NUMBER_OF_CARDS = 52;

    public function getValues(): array;

    /**
     * It figures out the winner of a battle.
     * @param array $cardsPlay The hand
     * @param array $values The values of a rank
     * @return int
     */
    public function battleWinner(array $cardsPlay, array $values): int;

    /**
     * It sums up the values of a given hand.
     * @param array $cardsPlay
     * @return int
     */
    public function sumRankOfCards(array $cardsPlay): int;
}
