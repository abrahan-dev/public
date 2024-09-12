<?php

namespace WarGame\Entity\Rank;

use WarGame\Entity\Rank;

/**
 * Class RankLong
 * A classic 52 deck rank.
 * @package WarGame\Entity\Rank
 */
class RankLong extends Rank
{
    const NUMBER_OF_CARDS = 52;

    protected $values = [
        'A',
        'Q',
        'K',
        'J',
        '10',
        '9',
        '8',
        '7',
        '6',
        '5',
        '4',
        '3',
        '2',
    ];

    public function getValues(): array
    {
        return $this->values;
    }
}
