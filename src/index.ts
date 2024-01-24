import Board from "views/board";
import { Brain } from "modules/brain/brain.module";
import "./static/index.css";
import { MoveRecorder } from "modules/recorder/recorder.module";
import { v4 as uuidv4 } from "uuid";
import { CHARACTER_CONFIGURATION } from "constants/config.constants";
import { last } from "rxjs";
import { MoveHistoryRecord } from "models/models";

// new Board();
const brain = new Brain();
const recorder = new MoveRecorder();
recorder.wipe();

// generate random moves and timestamp them
const lastMoves = Array.from({ length: 20 }).reduce(
  (p: [string, number, number][], _, i: number) => {
    const _now = Date.now() - 10 * (20 - i);
    if (i > 0) {
      const change = {
        x: Math.round(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1),
        y: Math.round(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1),
      };
      p.push([_now.toString(), p[i - 1][1] + change.x, p[i - 1][1] + change.y]);
    }
    return p;
  },
  [["1705945602264", CHARACTER_CONFIGURATION.x, CHARACTER_CONFIGURATION.y]]
);
const lastMovesAsRecord = lastMoves.reduce(
  (record: MoveHistoryRecord, cMove: [string, number, number]) => {
    record[cMove[0]] = [cMove[1], cMove[2]];
    return record;
  },
  {}
);
recorder.batchRecord(lastMovesAsRecord);
// Make the brain smarter
Array.from({length:100},()=>brain.fit());
// brain.think([0, 1, 0, 1, 1]);
