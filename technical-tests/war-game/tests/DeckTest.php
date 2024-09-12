<?php

use PHPUnit\Framework\TestCase;
use WarGame\Entity\Deck;
use WarGame\Entity\Player;
use WarGame\Entity\Rank\RankLong;
use WarGame\Entity\Rank\RankShort;

final class DeckTest extends TestCase
{
    public function testDeckHasCards()
    {
        $rankLong = new RankLong();
        $deck = new Deck($rankLong);
        $this->assertNotEmpty($deck->getCards());
    }

    public function testDeckRankLongHasANumberOfCards()
    {
        $rankLong = new RankLong();
        $deck = new Deck($rankLong);
        $cardsCount = count($deck->getCards());
        $this->assertEquals($cardsCount, $rankLong::NUMBER_OF_CARDS);
    }

    public function testDeckRankShortHasANumberOfCards()
    {
        $rankShort = new RankShort();
        $deck = new Deck($rankShort);
        $cardsCount = count($deck->getCards());
        $this->assertEquals($cardsCount, $rankShort::NUMBER_OF_CARDS);
    }

    public function testDeckCreatesTheNumberOfCardsGiven()
    {
        $rankShort = new RankShort();
        $deck = new Deck($rankShort);
        $cards = $deck->createCards($rankShort->getValues(), 100);
        $this->assertEquals(count($cards), 100);
    }

    public function testDeckCreatesTheRankValuesGiven()
    {
        $rankShort = new RankShort();
        $deck = new Deck($rankShort);
        $rankShortValues = $rankShort->getValues();
        $cards = $deck->createCards($rankShortValues, 100);
        $valuesExist = true;
        $valuesExist &= array_map(function($card) use ($rankShortValues) {
            return in_array($card->getValue(), $rankShortValues);
        }, $cards);
        $this->assertNotEmpty($valuesExist);
    }

    /**
     * @throws Exception
     */
    public function testDeckDivideThrowsExceptionIfPlayersGreaterThanCards()
    {
        $this->expectException(Exception::class);
        $rankShort = new RankShort();
        $deck = new Deck($rankShort);
        $players = array_map(function ($id) {
            return new Player($id);
        }, range(1,35));
        $deck->divide($players);
    }
}
