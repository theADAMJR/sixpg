import { bot } from '../../../bot';
import ImageGenerator from './image-generator';
import { Canvas, createCanvas } from 'canvas';
import { User } from 'discord.js';
import { MemberDocument } from '../../../data/models/member';
import { UserDocument, XPCard } from '../../../data/models/user';
import Leveling from '../../../modules/xp/leveling';

export class XPCardGenerator extends ImageGenerator {
    defaultColors = {
        primary: '#F4F2F3',
        secondary: '#46828D',
        tertiary: '#36E2CA'
    }

    discordUser: User;

    constructor(
        private user: UserDocument,
        private rank: number) {
        super();

        this.discordUser = bot.users.cache.get(user.id);
    }

    async generate(savedMember: MemberDocument, preview?: XPCard) {
        if (preview)
            this.user.xpCard = preview;

        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');

        await super.addBackgroundToCanvas(context, canvas,
            this.user.xpCard.backgroundURL);
        await this.addXPInfo(context, canvas, savedMember.xp);
        this.addUserText(context, canvas);
        await super.addAvatarToCanvas(context, 
                this.discordUser.displayAvatarURL({ format: 'png' }));

        return canvas.toBuffer();
    }
    
    private addUserText(context, canvas: Canvas) {
        let card = this.user.xpCard;

        context.fillStyle = card.tertiary || this.defaultColors.tertiary;
        context.font = '32px Roboto, sans-serif';
        context.fillText(`#${this.rank}`, canvas.width / 2.5, canvas.height / 2.5);

        context.fillStyle = card.primary || this.defaultColors.primary;
        context.font = super.applyText(canvas, this.discordUser.username);
        context.fillText(this.discordUser.username, canvas.width / 2.7, canvas.height / 1.6);
    }

    private async addXPInfo(context: CanvasRenderingContext2D, canvas, xp: number) {
        let card = this.user.xpCard;

        const sizeOffset = 325;
        const position = { x: 275, y: canvas.height * 0.775 };
        const height = 25;
        
        const { nextLevelXP, level, levelCompletion } = Leveling.xpInfo(xp);
        
        context.fillStyle = card.secondary || this.defaultColors.secondary;
        context.fillRect(position.x, position.y, canvas.width - sizeOffset - 1, height);

        context.fillStyle = card.tertiary || this.defaultColors.tertiary;
        context.fillRect(position.x, position.y, 
            (canvas.width - sizeOffset) * (levelCompletion), height);

        context.fillStyle = card.primary || this.defaultColors.primary;
        context.font = '16px Roboto, sans-serif';
        context.fillText(xp.toString(), canvas.width / 2.5, canvas.height / 1.175);
        
        context.fillStyle = '#0F0F0F';
        context.fillText(`/`, canvas.width / 2.5 + 
            context.measureText(xp.toString()).width, canvas.height / 1.175);

        context.fillStyle = card.primary || this.defaultColors.primary;
        context.fillText(`${nextLevelXP}XP`, canvas.width / 2.5 + 
            context.measureText(`${xp}/`).width, canvas.height / 1.175);
        
        context.fillStyle = card.primary || this.defaultColors.primary;
        context.fillText(`LEVEL ${level}`, canvas.width / 2.5, canvas.height / 1.35);
    }
}
