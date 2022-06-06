// Archivo de configuracion de webpack,con esto controlamos que nuestro archivo main.js se encuentre en fase de desarrollo(development), aca configuramos webpack como queremos que funcione.
//expresion regular nos sirve para saber si un string o parte de uno hace match con la expresion regular



const HtmlWebpack          = require('html-webpack-plugin')  //esto para llevar nuestro html a la carpeta dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //esto para llevar nuestro css a la carpeta dist
const CopyPlugin           = require("copy-webpack-plugin");//esto para llevar nuestras imgs a la carpeta dist


module.exports={
    mode: 'development',

    output:{                //esto borra el archivo(css/html) y lo crea de nuevo.
        clean: true             
    },



    module:{
        rules:[          
            {                                //reglas html
            test: /\.html$/,          //busca el archhivos html //
            loader: 'html-loader',    //busca html loader//
            options: {                //esto para llevar nuestro html a la carpeta dist
                  sources:false       
            }
            },
            {        //reglas css
                test: /\.css$/,
                exclude: /estilo.css$/,       //excluimos para que esta regla no aplique a estilo..css 
                use: ['style-loader','css-loader'],
            },
            {                                   //estas son las reglas que queremos aplicar a estilo.css por eso lo excluimos arriba
                test: /estilo.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']

            },
            {                        //reglas imagenes
                test: /\.(png)|jpe?|gif/,
                loader: 'file-loader'
            }
        ]
    },
   optimization:{},



   plugins:[
       new HtmlWebpack({               //esto me permite controlar el html
           title:'Mi webpack App',      //cambio el titulo
           template:'./src/index.html'                   //el template nos sirve para especificar de que archivo se basa nuestra app. 
        }),
        
       new MiniCssExtractPlugin({
           filename: '[name].css',
           ignoreOrder:false
       }),
       new CopyPlugin({
           patterns:[
               {from:'src/assets/',to:'assets/'}      //desde donde a donde quiero que vayan mis imgs
           ]
              
       })
   ]
}