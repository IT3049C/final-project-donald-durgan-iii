# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - link "Game Hub" [ref=e6] [cursor=pointer]:
        - /url: /
      - link "Rock Paper Scissors" [ref=e7] [cursor=pointer]:
        - /url: /rps
      - link "Tic Tac Toe" [ref=e8] [cursor=pointer]:
        - /url: /tic-tac-toe
      - link "Wordle" [ref=e9] [cursor=pointer]:
        - /url: /wordle
      - link "Memory" [ref=e10] [cursor=pointer]:
        - /url: /memory
    - generic "Player name display" [ref=e12]: "Player: Guest"
  - main [ref=e13]:
    - generic [ref=e14]:
      - heading "Memory Cards" [level=1] [ref=e15]
      - paragraph [ref=e16]: "Player: Guest"
      - grid "Memory cards" [ref=e17]:
        - button "Card 3" [ref=e18]: "?"
        - button "Card 2" [ref=e19]: "?"
        - button "Card 5" [ref=e20]: "?"
        - button "Card 7" [ref=e21]: "?"
        - button "Card 9" [ref=e22]: "?"
        - button "Card 10" [ref=e23]: "?"
        - button "Card 6" [ref=e24]: "?"
        - button "Card 1" [ref=e25]: "?"
        - button "Card 8" [ref=e26]: "?"
        - button "Card 11" [ref=e27]: "?"
        - button "Card 0" [active] [ref=e28]: A
        - button "Card 4" [ref=e29]: "?"
      - button "Reset game" [ref=e30]: Reset
```