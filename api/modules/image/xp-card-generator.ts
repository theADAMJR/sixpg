import { bot } from '../../../bot';
import ImageGenerator from './image-generator';
import { Canvas, createCanvas } from 'canvas';
import { User } from 'discord.js';
import { MemberDocument } from '../../../models/member';
import { UserDocument, XPCard } from '../../../models/user';
import Leveling from '../../../modules/xp/leveling';

export class XPCardGenerator extends ImageGenerator {
    colors = {
        primary: '#F4F2F3',
        secondary: '#46828D',
        tertiary: '#36E2CA'
    }

    discordUser: User;

    constructor(
        private user: UserDocument,
        private rank: number,
        private xpPerMessage: number) {
        super();

        this.discordUser = bot.users.cache.get(user.id);
        if (!this.discordUser)
            throw Error('Could not find Discord user!');
        if (this.discordUser.bot)
            throw Error('Bots don\'t have XP cards!');
    }

    async generate(savedMember: MemberDocument, preview?: XPCard) {
        if (preview)
            this.user.xpCard = preview;            
        
        if (!savedMember)
            throw new Error('Guild user cannot be null!');

        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');

        await super.addBackgroundToCanvas(
                context, canvas, this.user.xpCard.backgroundURL);
        await this.addXPBar(context, canvas, savedMember);
        this.addUserText(context, canvas);
        await super.addAvatarToCanvas(context, this.discordUser.displayAvatarURL({ format: 'png' }));

        return canvas.toBuffer();
    }
    private addUserText(context, canvas: Canvas) {
        let card = this.user.xpCard;

        context.fillStyle = card.tertiary || this.colors.tertiary;
        context.font = '32px Roboto, sans-serif';

        const rank = `#${this.rank}`;
        context.fillText(rank, canvas.width / 2.5, canvas.height / 2.5);

        context.fillStyle = card.primary || this.colors.primary;
        context.font = super.applyText(canvas, this.discordUser.username);        
        context.fillText(this.discordUser.username, canvas.width / 2.7, canvas.height / 1.6);

        context.fillStyle = card.tertiary || this.colors.tertiary;
        context.font = super.applyText(canvas, `#${this.discordUser.discriminator}`);  

        context.fillText(`#${this.discordUser.discriminator}`, canvas.width / 2.7 + context.measureText(this.discordUser.username), canvas.height / 1.6);
    }
    private async addXPBar(context, canvas, member: MemberDocument) {
        let card = this.user.xpCard;

        const sizeOffset = 325;
        const position = { x: 275, y: canvas.height * 0.775 };
        const height = 25;
        
        const { exp, nextLevelXP, level, levelCompletion } = Leveling.xpInfo(member.xpMessages, 
                this.xpPerMessage);   

        context.fillStyle = card.secondary || this.colors.secondary;
        context.fillRect(position.x, position.y, canvas.width - sizeOffset - 1, height);
        context.fillStyle = card.primary || this.colors.tertiary;
        context.fillRect(position.x, position.y, 
            (canvas.width - sizeOffset) * (levelCompletion), height);

        context.fillStyle = card.primary || this.colors.primary;
        context.font = '16px Roboto, sans-serif';
        context.fillText(exp, canvas.width / 2.5, canvas.height / 1.175);
        
        context.fillStyle = '#0F0F0F';
        context.fillText(`/`, canvas.width / 2.5 + 
            context.measureText(exp).width, canvas.height / 1.175);

        context.fillStyle = card.secondary || this.colors.secondary;
        context.fillText(`${nextLevelXP}XP`, canvas.width / 2.5 + 
            context.measureText(`${exp}/`).width, canvas.height / 1.175);
        
        context.fillStyle = card.primary || this.colors.primary;
        context.fillText(`LEVEL ${level}`, canvas.width / 2.5, canvas.height / 1.35);
    }
}
