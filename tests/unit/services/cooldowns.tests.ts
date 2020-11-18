import Cooldowns from "../../../src/services/cooldowns";
import { User } from "discord.js";
import { mock } from "ts-mockito";
import { Command } from "../../../src/commands/Command";
import { expect } from "chai";

describe('services/cooldowns', () => {
    let cooldowns: Cooldowns;
    let user: User;
    let command: Command;

    beforeEach(() => {
        cooldowns = new Cooldowns();
        user = mock(User);
        command = mock(command);

        user.id = '123';
        command.name = 'ping';
    });

    it('no cooldowns, active', () => {
        const result = cooldowns.active(user, command);

        expect(result).to.be.false;
    });

    it('user in cooldown, inactive', () => {
        cooldowns.add(user, command);

        const result = cooldowns.active(user, command);

        expect(result).to.be.true;
    });

    it('user cooldown removed, inactive', () => {
        cooldowns.add(user, command);
        cooldowns.remove(user, command);

        const result = cooldowns.active(user, command);

        expect(result).to.be.false;
    });
});