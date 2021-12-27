import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>                                        
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700;900&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="favicon.png" type="image/png" />
                    <meta
                    name="description"
                    content="Prova kumulus - agora com nextJS e Chakra-UI"
                    />      
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );        
    }
}