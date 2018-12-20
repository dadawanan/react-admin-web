import routes from './router.config';
import defaultSettings from '../src/defaultSettings';
export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true,
            },
            locale: {
                enable: true,
                default: 'zh-CN',
                baseNavigator: true,
            },
            targets: {
                ie: 11,
            },
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
            },
            dll: {
                include: ['dva', 'dva/router', 'dva/saga'],
                //exclude: ['@babel/runtime'],
            },
            hardSource: true,
        }]
    ],
    routes: routes,
    theme: {
        'primary-color': defaultSettings.primaryColor,
    },
    cssLoaderOptions: {
        modules: true,
        getLocalIdent: (context, localIdentName, localName) => {
            if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('global.less')
            ) {
                return localName;
            }
            const match = context.resourcePath.match(/src(.*)/);
            if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = antdProPath
                    .split('/')
                    .map(a => a.replace(/([A-Z])/g, '-$1'))
                    .map(a => a.toLowerCase());
                return `zxh${arr.join('-')}-${localName}`.replace(/--/g, '-');
            }
            return localName;
        },
    },
    manifest: {
        basePath: '/',
    },
}