import { IPostLeaderboardRequest } from "../../shared/types/leaderboard.type";
import { Service } from "../Service";

export class LeaderboardApi extends Service {
  static getLeaderboard() {
    return this.get("/api/v1/leaderboards");
  }

  static postLeaderboard(data: IPostLeaderboardRequest) {
    return this.post("/api/v1/leaderboards", { ...data });
  }
}
