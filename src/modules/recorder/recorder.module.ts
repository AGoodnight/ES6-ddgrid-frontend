import { FlatPosition, MoveHistoryRecord } from "models/models";

export class MoveRecorder {
  private storageKey = "player_move_history";
  private recordedMoves: MoveHistoryRecord;
  constructor() {
    const previous_history = window.localStorage.getItem(this.storageKey);
    this.recordedMoves = previous_history ? JSON.parse(previous_history) : {};
  }
  record(data: FlatPosition) {
    this.recordedMoves = Object.assign({}, this.recordedMoves, {
      [Date.now().toString()]: data,
    });
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.recordedMoves)
    );
  }
  batchRecord(data: MoveHistoryRecord) {
    this.recordedMoves = Object.assign({}, this.recordedMoves, data);
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.recordedMoves)
    );
  }
  wipe() {
    this.recordedMoves = {};
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.recordedMoves)
    );
  }
}
