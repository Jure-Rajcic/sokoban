// import * as fs from 'fs';

export default class CategoryService {

    private static instance: CategoryService;

    private total_categories_count?: number;
    private _map: Map<number, string[][]>;


    private constructor() {
        this.total_categories_count = undefined;
        this._map = new Map();
    }

    public totalCategoriesCount(): number {
        if (this.total_categories_count === undefined) {
            this.total_categories_count = this._totalCategoriesCount();
        }
        return this.total_categories_count;
    }

    private _totalCategoriesCount(): number {
        // TODO: probably some webpack magic
        // const folderPath = '/api/resources';
        // try {
        //     const files = fs.readdirSync(folderPath);
        //     const onlyFiles = files.filter(file => {
        //         const filePath = `${folderPath}/${file}`;
        //         return fs.statSync(filePath).isFile();
        //     });
        //     const numberOfFiles = onlyFiles.length;
        //     console.log(`Number of files in ${folderPath}: ${numberOfFiles}`);
        //     return numberOfFiles;
        // } catch (err) {
        //     console.error('Error reading folder:', err);
        //     return 0;
        // }
        return 10;
    }




    public async fetchCategory(categoryId: number): Promise<string[][]> {
        if (!this._map.has(categoryId)) {
            const category = await this._fetchCategory(categoryId);
            this._map.set(categoryId, category);
        }
        return this._map.get(categoryId)!;
    }



    private async _fetchCategory(categoryId: number): Promise<string[][]> {
        interface LocalLevelDataFormat {
            Layout: string[]
        }

        try {
            const response = await fetch(`/api/resources/${categoryId}.json`)
            const levelLayouts: LocalLevelDataFormat[] = await response.json();
            const category: string[][] = [];
            levelLayouts.forEach((level) => {
                const layout: string[] = level.Layout;
                category.push(layout)
            });
            return category;
        } catch (error) {
            console.log(error)
            return []
        }
    }



    public totalLevelsCount(categoryId: number): number {
        if (!this._map.has(categoryId)) {
            throw new Error(`Category ${categoryId} is not fetched yet`);
        }
        return this._map.get(categoryId)!.length;
    }

    public levelLayout(categoryId: number, levelId: number): string[][] {
        if (!this._map.has(categoryId)) {
            throw new Error(`Category ${categoryId} is not fetched yet`);
        }
        if (levelId < 1 || levelId > this.totalLevelsCount(categoryId)) {
            throw new Error(`Level ${levelId} is out of bounds`);
        }
        const category = this._map.get(categoryId)!;
        const layout = category[levelId - 1].map((row: string) => row.split(''));

        const maxRowLength = Math.max(...layout.map((row: string[]) => row.length));
        layout.forEach((row: string[]) => {
            while (row.length < maxRowLength) {
                row.push(' ');
            }
        });
        return layout;
    }

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }
}