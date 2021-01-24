import { writeConfig, readConfig } from '../lib/lowdb';
import { readFileSync } from 'fs';
/**
 * TODO: Add Logged in routes
 */

module.exports = {
    changeDiscounts: (req, res) => {
        const props: Record<string, string> = (({
                                                    isDiscount,
                                                    originalPrice,
                                                    discountPercentage,
                                                    showAnyVims,
                                                }: Record<string, string>) => ({
            isDiscount,
            originalPrice,
            discountPercentage,
            showAnyVims,
        }))(req.body);

        Object.keys(props).reduce((r, d) => {
            if (props[d] != undefined) {
                writeConfig(d, props[d]);
                return { ...r, [d]: props[d] };
            }
            return { ...r, [d]: readConfig(d) };
        }, {});
        res.json(JSON.parse(readFileSync('config.json', 'utf-8')));
    }
}