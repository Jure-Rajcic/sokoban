import DefaultGameTheme from "./DefaultGameTheme";
import GameTheme from '../../models/AGameTheme';
import ConfigurableGameTheme from "./ConfigurableGameTheme";

export default class GameThemesFactory {

    private readonly themes: GameTheme[];
    private index: number;

    private constructor() {
        this.themes = [
            // new DefaultGameTheme(),
            new ConfigurableGameTheme(1, 1, 1),
            new ConfigurableGameTheme(1, 2, 1),
            new ConfigurableGameTheme(1, 3, 1),
            new ConfigurableGameTheme(1, 4, 1),
            new ConfigurableGameTheme(1, 5, 1),
        ];
        this.index = 0;
    }

    private static instance: GameThemesFactory = new GameThemesFactory();

    public static get themesCount(): number {
        const instance = GameThemesFactory.instance;
        return instance.themes.length;
    }

    public static changeTheme(): void {
        const instance = GameThemesFactory.instance;
        instance.index = (instance.index + 1) % instance.themes.length;
    }

    public static get currentTheme(): GameTheme {
        const instance = GameThemesFactory.instance;
        return instance.themes[instance.index];
    }
}