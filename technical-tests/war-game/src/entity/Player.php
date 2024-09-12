<?php

namespace WarGame\Entity;

use WarGame\Entity\Card;

class Player
{
    public $cards;
    protected $id;

    public function __construct(int $id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * When the player wins a hand, it takes new cards.
     * The player takes first its own cards, then the others.
     * @param array $cardsByPlayer
     */
    public function take(array $cardsByPlayer)
    {
        /** @var Card $card */
        foreach ($cardsByPlayer[$this->id] as $card) {
            $this->cards[] = $card;
        }

        unset($cardsByPlayer[$this->id]);

        foreach ($cardsByPlayer as $cardsPlay) {
            foreach ($cardsPlay as $card) {
                $this->cards[] = $card;
            }
        }
    }
}
