import { resUrl } from "../const/Const";
import { MapConfig } from "../config/MapConfig";
import { HeroConfig } from "../config/HeroConfig";
import { HeroSkillConfig } from "../config/HeroSkillConfig";
import { MagicConfig } from "../config/MagicConfig";
import { SoldierConfig } from "../config/SoldierConfig";
import { SoldierSkillConfig } from "../config/SoldierSkillConfig";
import { ModelInfoConfig } from "../config/ModelInfoConfig";
import { EffectsConfig } from "../config/EffectsConfig";
import { TreasConfig } from "../config/TreasConfig";
import { Singleton } from "../utils/Singleton";

export default class ConfigManager extends Singleton<ConfigManager>() {

    treas: { [id: number]: TreasConfig };
    magic: { [key: number]: MagicConfig };
    map: { [key: number]: MapConfig } = {};
    map_ground: { [ground: number]: MapConfig[] } = {};
    hero_color_level: { [hid: number]: { [color: number]: HeroConfig } };
    heroSkill: { [sid: number]: { [level: number]: HeroSkillConfig } };
    soldier: { [key: number]: SoldierConfig };
    soldierSkill: { [key: number]: SoldierSkillConfig };
    modelInfo: { [key: number]: { [key: number]: ModelInfoConfig } };
    effects: { [key: number]: EffectsConfig };

    public async loadConfig() {
        let t = this;

        return new Promise((resolve, reject) => {
            cc.loader.load(resUrl + "0config.json", (err, res) => {
                if (err) {
                    cc.log(err);
                    return;
                }

                for (let fieldName in res) {
                    t[fieldName] = res[fieldName];
                }

                cc.loader.releaseAsset(res);
                resolve();
            })
        });
    }

    public initCfgData() {

    }
}
