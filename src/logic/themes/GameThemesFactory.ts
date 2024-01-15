import DefaultGameTheme from "./DefaultGameTheme";
import GameTheme from '../../models/AGameTheme';
import ChristmasGameTheme from "./ChristmasGameTheme";

export default class GameThemesFactory {

    private readonly themes: GameTheme[];
    private index: number;

    private constructor() {
        this.themes = [
            new DefaultGameTheme(),
            new ChristmasGameTheme()
        ];
        this.index = 0;
    }

    private static instance: GameThemesFactory = new GameThemesFactory();
    

    public static changeTheme(): void {
        const instance = GameThemesFactory.instance;
        instance.index = (instance.index + 1) % instance.themes.length;
    }

    public static get currentTheme(): GameTheme {
        const instance = GameThemesFactory.instance;
        return instance.themes[instance.index];
    }
}