const args = process.argv.slice(2);

type Config = {
    year: number;
    day: number;
    debug: number;
};

let conf: Config = {
    year: 0,
    day: 0,
    debug: 0
}

async function launch(): Promise<void> {
    try {
        args.forEach(arg => {
            const [key, value] = arg.split('=');
            if (key in conf) {
                conf[key as keyof Config] = Number(value);
            }
        });

        const { V1, V2 } = await import(`./${conf.year}/day${conf.day}`);
        const isDebug = conf.debug === 1;
        
        if (V1 || V2) {
            console.log()
            console.log()
            console.log('RUN     : Test ' + conf.day + ` (${conf.year})`)
            console.log()

            if (V1) {
                let day_V1 = new V1(Number(conf.year), Number(conf.day), isDebug)
                day_V1.init().then(() => {
                    day_V1.run()
                    console.log('V1 : ', day_V1.result);
                });
            }

            if (V2) {
                let day_V2 = new V2(Number(conf.year), Number(conf.day), isDebug)
                day_V2.init().then(() => {
                    day_V2.run()
                    console.log('V2 : ', day_V2.result);
                });
            }

        } else {
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        console.log(`WARNING : Test ${conf.year}-${conf.day} not found`);
    }
}

launch();
