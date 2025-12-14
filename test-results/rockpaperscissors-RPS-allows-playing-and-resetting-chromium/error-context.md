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
        - heading "Multiplayer" [level=2] [ref=e18]
        - button "Create Room" [ref=e19]
        - generic [ref=e20]:
          - text: Room ID
          - textbox "Room ID" [ref=e21]
          - button "Join Room" [ref=e22]
      - separator [ref=e23]
      - generic [ref=e24]:
        - heading "Single Player Mode" [level=2] [ref=e25]
        - button "Play rock" [active] [ref=e26]: Rock
        - button "Play paper" [ref=e27]: Paper
        - button "Play scissors" [ref=e28]: Scissors
        - paragraph [ref=e29]: "Player move: rock"
        - paragraph [ref=e30]: "CPU move: rock"
        - paragraph [ref=e31]: "Result: draw"
```