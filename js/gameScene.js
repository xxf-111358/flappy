( function( w ){

    function Scene( ctx, imgObj ){
        this.ctx = ctx;
        this.imgObj = imgObj;

        this.listeners = [];

        this.roles = [];

        this._initRoles();

    }

    util.extend( Scene.prototype, {
        _initRoles: function(){
            this.roles.push( getSky( this.ctx, this.imgObj.sky, 5 ) );
            this.roles.push( getSky( this.ctx, this.imgObj.sky, 5 ) );

            for( var i = 0; i < 6; i++ ){
                this.roles.push( getPipe( this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 150, this.imgObj.land.height, 5 ) );
            }

            for( var i = 0; i < 4; i++ ){
                this.roles.push( getLand( this.ctx, this.imgObj.land, 5 ) );
            }

            this.roles.push( getBird( this.ctx, this.imgObj.bird, 3, 1, 10, 10 ) );
        },
        addListener: function( listener ){
            this.listeners.push( listener );
        },
        draw: function(){
          var bird = getBird();
          var birdCoreX = bird.x + bird.width / 2;
          var birdCoreY = bird.y + bird.height / 2;

          if( this.ctx.isPointInPath( birdCoreX, birdCoreY ) || birdCoreY < 0  || birdCoreY > ( this.ctx.canvas.height - this.imgObj.land.height ) ){
                this.listeners.forEach( function( liste ){
                    liste();
                } )
          }else{
            this.ctx.beginPath();
            this.roles.forEach( function( role ){
                role.draw();//进入到每个实例的原型中调用draw方法
                role.update();//进入到每个实例的原型中调用update方法
            } );
          }
        }
    });
    w.getGameScene = function( ctx, imgObj ){
        return new Scene( ctx, imgObj );
    }

} ( window ));