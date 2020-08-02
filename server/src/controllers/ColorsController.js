const { Request, Response } = require('express');
const { getPaletteFromURL } = require('color-thief-node')

class ColorsController {
    async paletteColor(Request, Response) {
        const urls = Request.body
        let colors = new Array()

        for (let index = 0; index < urls.length; index++) {
            const imgUrl = `https://image.tmdb.org/t/p/original${urls[index].poster_path}`

            let palette = await getPaletteFromURL(imgUrl)

            for (let i = 0; i < palette.length; i++) {
                const r = componentToHex(palette[i][0])
                const g = componentToHex(palette[i][1])
                const b = componentToHex(palette[i][2])
                
                palette[i] = `#${r}${g}${b}`
            }
            colors.push(palette)
        }

        return Response.json({ colors })

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex
        }
    }

}

module.exports = ColorsController