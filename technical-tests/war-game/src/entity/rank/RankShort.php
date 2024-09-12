<?php

namespace WarGame\Entity\Rank;

use WarGame\Entity\Rank;

/**
 * Class RankShort
 * A deck rank of 32 cards.
 * @package WarGame\Entity\Rank
 */
class RankShort extends Rank
{
    const NUMBER_OF_CARDS = 32;

    protected $values = [
        'A',
        'Q',
        'K',
        'J',
        '10',
        '9',
        '8',
        '7',
    ];

    public function getValues(): array
    {
        return $this->values;
    }
}
