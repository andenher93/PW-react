import React from "react";
import { Link } from 'react-router';
import cookie from 'react-cookie';

// Static content
var titles 		= ['Udvikler' , 'Minimalist' , 'Simplist', 'Elegantier'],
    titleNr 	= Math.floor(Math.random()*titles.length),
    text 		= 'André Nøbbe.';
// Global Vars content
var that, animationInterval;

export default class Home extends React.Component {
    constructor(props){
        super(props);
        window.scrollTo(0,0);
        this.state = {header: ""};
    }
    componentDidMount(){
        that = this;
        if(!cookie.load('homeIsVisited')){
            cookie.save('homeIsVisited', "true", { path: '/' });
            this.loadAnimations();
        }else{
            this.setState({header: text + ' ' + titles[titleNr]});
            document.querySelector('.content').className += ' active';
            this.loadTitleIdle();
        }
        
    }
    
    componentWillUnmount (){
        clearInterval(animationInterval);
    }

    loadAnimations(){
        // Selectors
        var content = document.querySelector('.content');

        // typewriter animation
        that.typeWriter(text, 0, function(){
            setTimeout(function(){
                that.typeWriter(text + ' ' + titles[titleNr], text.length+1, function(){
                    content.className += ' active';
                    that.loadTitleIdle();
                })
            }, 600);
        });
    }

    typeWriter(text, n, callback){
        if (n <= text.length) {
            that.setState({header: text.substring(0, n)});
            n++;
            setTimeout(function() {
                that.typeWriter(text, n, callback)
            }, Math.floor(Math.random() * 1000/18) + 1000/13);
        }else{
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    }

    loadTitleIdle(){
        animationInterval = setInterval(function(){
            titleNr = (titleNr + 1) % titles.length;
            requestAnimationFrame(function(){
                that.typeWriter(text + ' ' + titles[titleNr], text.length+1)
            });
        }, 3500);
    }

    render() {
        return (
            <div>
                <section className="container">
                    <noscript><h1 className="logo">André Nøbbe. Udvikler</h1></noscript>
                    <h1 className="logo">{this.state.header}</h1>
                </section>
                <section className="content">
                    <div className="container">
                        <p>Hej, jeg er en fyr på 22 år og i øjeblikket er jeg på mit sidste år som gymnasieelev på den almene gymnasiale uddannelse, hvor jeg dimitter d. 24. Juni. Jeg har tidligere tage webintegrator uddannelsen, som åbnede en lille smule op for programmeringsverdenen. Men allerede få måneder inde i hovedforløbet vidst jeg, at dette ikke var nok for mig, hvilket gjorde, at jeg ville studere faget på et højere niveau. Derfor tog jeg på gym og nu søger jeg ind på datalogi med start til august 2016.</p>
                        <p>Jeg har tidligere arbejdet på lidt forskellige projekter bl.a. under webintergrator uddannelsen, dannede en kammerat fra holdt og jeg en virksomhed, <Link to="/projekter/flipzone">Flipzone</Link>. I dette navn lavede vi nogle småjobs som hjemmeside og marskot for mobil-reparatør-virksomheden <Link to="/projekter/onerepair">onerepair</Link>.</p>
                    </div>
                </section>
            </div>
        )
    }
}