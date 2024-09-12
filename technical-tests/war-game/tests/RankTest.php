<?php

use PHPUnit\Framework\TestCase;
use WarGame\Entity\Rank\RankLong;
use WarGame\Entity\Rank\RankShort;

final class RankTest extends TestCase
{
    public function testRankLongMustHaveAListOfValues(): void
    {
        $rank = new RankLong();
        $this->assertNotEmpty($rank->getValues());
    }

    public function testRankShortMustHaveAListOfValues(): void
    {
        $rank = new RankShort();
        $this->assertNotEmpty($rank->getValues());
    }

    public function testRankLongHaveANumberOfCards()
    {
        $rank = new RankLong();
        $this->assertGreaterThan(0, $rank::NUMBER_OF_CARDS);
    }

    public function testRankShortHaveANumberOfCards()
    {
        $rank = new RankShort();
        $this->assertGreaterThan(0, $rank::NUMBER_OF_CARDS);
    }

    public function testBattleWinner()
    {
        $rank = new RankLong();
        $cardsPlay = [
            67 => [new \WarGame\Entity\Card("K")],
            45 => [new \WarGame\Entity\Card("A")],
            23 => [new \WarGame\Entity\Card("2")],
        ];
        $winner = $rank->battleWinner($cardsPlay, $rank->getValues());
        $this->assertEquals($winner, 45);
    }
}
