// ✅ Types
export type RpsMove = "rock" | "paper" | "scissors" | null;

export type RpsRoomState = {
  roomId: string;
  players: { id: string; name: string }[];
  moves: Record<string, RpsMove>;
  winnerId: string | null;
};

type RoomCallback = (state: RpsRoomState) => void;

// ✅ In-memory room store (mock backend)
const rooms: Record<string, RpsRoomState> = {};
const subscribers: Record<string, RoomCallback[]> = {};

// ✅ Utility: notify all subscribers
function broadcast(roomId: string) {
  const room = rooms[roomId];
  if (!room) return;

  subscribers[roomId]?.forEach(cb => cb({ ...room }));
}

// ✅ Utility: compute winner
function computeWinner(room: RpsRoomState): string | null {
  const moves = Object.values(room.moves);
  if (moves.length < 2) return null;

  const [p1, p2] = room.players;
  const m1 = room.moves[p1.id];
  const m2 = room.moves[p2.id];

  if (!m1 || !m2) return null;

  if (m1 === m2) return null;

  const beats: Record<Exclude<RpsMove, null>, RpsMove> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  const nm1 = m1 as Exclude<RpsMove, null>;
  const nm2 = m2 as Exclude<RpsMove, null>;

  if (beats[nm1] === nm2) return p1.id;
  if (beats[nm2] === nm1) return p2.id;

  return null;
}

// ✅ Create Room
export async function createRoom(playerName: string): Promise<RpsRoomState> {
  const roomId = "room-" + Math.random().toString(36).substring(2, 8);

  const room: RpsRoomState = {
    roomId,
    players: [{ id: "player1", name: playerName }],
    moves: {},
    winnerId: null
  };

  rooms[roomId] = room;
  subscribers[roomId] = [];

  broadcast(roomId);
  return { ...room };
}

// ✅ Join Room
export async function joinRoom(
  roomId: string,
  playerName: string
): Promise<RpsRoomState> {
  const room = rooms[roomId];
  if (!room) throw new Error("Room not found");

  const newPlayer = { id: "player2", name: playerName };
  room.players.push(newPlayer);

  broadcast(roomId);
  return { ...room };
}

// ✅ Subscribe to room updates
export function subscribeToRoom(
  roomId: string,
  callback: RoomCallback
): () => void {
  if (!subscribers[roomId]) subscribers[roomId] = [];
  subscribers[roomId].push(callback);

  // Immediately send current state
  callback({ ...rooms[roomId] });

  // Unsubscribe function
  return () => {
    subscribers[roomId] = subscribers[roomId].filter(cb => cb !== callback);
  };
}

// ✅ Send Move
export async function sendMove(
  roomId: string,
  playerId: string,
  move: RpsMove
): Promise<void> {
  const room = rooms[roomId];
  if (!room) return;

  room.moves[playerId] = move;

  // Compute winner if both players moved
  const winner = computeWinner(room);
  room.winnerId = winner;

  broadcast(roomId);
}
