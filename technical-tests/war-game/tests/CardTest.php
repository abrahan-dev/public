<?php

use PHPUnit\Framework\TestCase;
use WarGame\Entity\Card;

final class CardTest extends TestCase
{
    public function testCardMustHaveValue(): void
    {
        $card = new Card('Q');
        $this->assertEquals($card->getValue(), 'Q');
    }
}
