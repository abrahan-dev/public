<?php

use PHPUnit\Framework\TestCase;
use WarGame\Entity\Card;
use WarGame\Entity\Player;

final class PlayerTest extends TestCase
{
    public function testPlayerHasId()
    {
        $player = new Player(1);
        $this->assertEquals($player->getId(), 1);
    }

    public function testPlayerTakesCards()
    {
        $player = new Player(34);
        $player->cards = [
            new Card("Q"),
            new Card("K"),
        ];
        $player->take([
            34 => [new Card("J")]
        ]);
        $card = array_pop($player->cards);
        $this->assertEquals("J", $card->getValue());
    }
}
