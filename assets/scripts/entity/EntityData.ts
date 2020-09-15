export class EntityData {
    id: number;
    x: number;
    y: number;
    type: EntityType;
}

enum EntityType {
    hero,
    soldier,
    obstacle,
    wall,
}
