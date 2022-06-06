// Archivo de configuracion de webpack,con esto controlamos que nuestro archivo main.js se encuentre en fase de desarrollo(development), aca configuramos webpack como queremos que funcione.
//expresion regular nos sirve para saber si un string o parte de uno hace match con la expresion regular



const HtmlWebpack          = require('html-webpack-plugin')  //esto para llevar nuestro html a la carpeta dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //esto para llevar nuestro css a la carpeta dist
const CopyPlugin           = require("copy-webpack-plugin");//esto para llevar nuestras imgs a la carpeta dist

const Cssminimizer         = require('css-minimizer-webpack-plugin');// //esto es para que nos minimice o optimice el css, todo junto
const Terser               = require('terser-webpack-plugin');                  // //esto es para que nos minimice o optimice el css, todo junto


module.exports={
    mode: 'production',

    output:{                //esto borra el archivo(css/html) y lo crea de nuevo.
        clean: true,
        filename:  'main.[contenthash].js'           
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
            },
            {
               test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  } 
            }
        }
                
        ]
    },
   optimization:{                                         //esto es para que nos minimice o optimice el css, todo junto
       minimize:true,
       minimizer:[
           new Cssminimizer(),
           new Terser  (),
       ]
   },



   plugins:[
       new HtmlWebpack({               //esto me permite controlar el html
           title:'Mi webpack App',      //cambio el titulo
           template:'./src/index.html'                   //el template nos sirve para especificar de que archivo se basa nuestra app. 
        }),
        
       new MiniCssExtractPlugin({
           filename: '[name].[fullhash].css',        //fulhash 
           ignoreOrder:false
       }),
       new CopyPlugin({
           patterns:[
               {from:'src/assets/',to:'assets/'}      //desde donde a donde quiero que vayan mis imgs
           ]
              
       })
   ]
}