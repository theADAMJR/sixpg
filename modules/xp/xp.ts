import Module from "../module";

export class XPModule extends Module {
    levelRoles: LevelRole[] = [];
}

export interface LevelRole {
    level: number;
    role: string;
}
