export type RpsMove = "rock" | "paper" | "scissors" | null;

export type RpsRoomState = {
  roomId: string;
  players: { id: string; name: string }[];
  moves: Record<string, RpsMove>;
  winnerId: string | null;
};

type RoomCallback = (state: RpsRoomState) => void;

// These are placeholders for your course game room API.
export async function createRoom(playerName: string): Promise<RpsRoomState> {
  // TODO: integrate with real API
  return {
    roomId: "debug-room",
    players: [{ id: "player1", name: playerName }],
    moves: {},
    winnerId: null
  };
}

export async function joinRoom(
  roomId: string,
  playerName: string
): Promise<RpsRoomState> {
  // TODO: integrate with real API
  return {
    roomId,
    players: [
      { id: "player1", name: "Host" },
      { id: "player2", name: playerName }
    ],
    moves: {},
    winnerId: null
  };
}

export function subscribeToRoom(
  roomId: string,
  callback: RoomCallback
): () => void {
  // TODO: integrate real subscription
  // Return unsubscribe function
  return () => {};
}

export async function sendMove(
  roomId: string,
  playerId: string,
  move: RpsMove
): Promise<void> {
  // TODO: call API
  console.log("Send move", roomId, playerId, move);
}
