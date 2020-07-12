import { BotDocument, SavedBot } from './models/bot';
import DBWrapper from './db-wrapper';
import SnowflakeEntity from './snowflake-entity';

export default class Bots extends DBWrapper<SnowflakeEntity, BotDocument> {
    protected async getOrCreate({ id }: SnowflakeEntity) {
        const savedBot = await SavedBot.findById(id);
        return savedBot ?? this.create({ id });
    }

    protected create({ id }: SnowflakeEntity) {
        return new SavedBot({ _id: id }).save();
    }

    async getAll() {
        return await SavedBot.find();
    }

    async getManageableBots(ownerId: string) {
        return await SavedBot.find({ ownerId });
    }

    exists({ id }: SnowflakeEntity) {
        return SavedBot.exists({ id });
    }
}