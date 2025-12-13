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
      - heading "Rock Paper Scissors" [level=1] [ref=e15]
      - paragraph [ref=e16]: "Player: Guest"
      - generic [ref=e17]:
        - paragraph [ref=e18]: "Choose your move:"
        - generic [ref=e19]:
          - button "Play rock" [ref=e20]: Rock
          - button "Play paper" [ref=e21]: Paper
          - button "Play scissors" [ref=e22]: Scissors
      - generic [ref=e23]:
        - paragraph [ref=e24]: "Player move: -"
        - paragraph [ref=e25]: "CPU move: -"
      - button "Reset game" [ref=e26]: Reset
      - separator [ref=e27]
      - generic [ref=e28]:
        - heading "Multiplayer (Room API placeholder)" [level=2] [ref=e29]
        - paragraph [ref=e30]: This section is where you integrate the course room API for real multiplayer.
```