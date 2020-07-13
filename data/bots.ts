import { BotDocument, SavedBot } from './models/bot';
import DBWrapper from './db-wrapper';
import SnowflakeEntity from './snowflake-entity';
import GlobalBots from '../global-bots';

export default class Bots extends DBWrapper<SnowflakeEntity, BotDocument> {
    protected async getOrCreate({ id }: SnowflakeEntity) {
        if (!id) return null;

        return await SavedBot.findById(id) ?? this.create({ id });
    }

    protected create({ id }: SnowflakeEntity) {
        return new SavedBot({ _id: id }).save();
    }

    async getAll() {
        return await SavedBot.find();
    }

    async getManageableBots(ownerId: string) {
        const savedBots = await SavedBot.find({ ownerId });
        return savedBots
            .map(b => GlobalBots.get(b._id)?.user);
    }

    exists({ id }: SnowflakeEntity) {
        return SavedBot.exists({ id });
    }

    async delete(id: any) {
        return await SavedBot.findByIdAndDelete(id);
    }
}