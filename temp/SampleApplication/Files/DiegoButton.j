@implementation DiegoButton : CPButton {

  BOOL    highlighted ;
  CPString toolTipString @accessors;
}

- (id)initWithFrame:(CGRect) aFrame{

    self = [super initWithFrame:aFrame];
    [self initialSetings];
    return self;
}

-(void) initialSetings{

  highlighted = YES ;
  [self setDefaultBackgroundColor];
  [self setBordered:NO];
}

-(void)setEnabledState:(BOOL)isEnable{
    if(isEnable == YES){
      [self setEnabled:YES]
      [self setTextColor:[CPColor whiteColor]];
      [self setDefaultBackgroundColor];
    }else{
      [self setEnabled:NO]
      [self setTextColor:[CPColor colorWithRed:195/255
                                                     green:195/255
                                                      blue:195/255
                                                     alpha:1.0]];
      [self setBackgroundColor:[CPColor colorWithRed:91/255
                                               green:91/255
                                                blue:91/255
                                               alpha:1.0]];
    }
}
-(void)setDefaultBackgroundColor{

	 [self setBackgroundColor:[CPColor colorWithRed:0/255
                                           green:183/255
                                            blue:227/255
                                           alpha:1.0]];
}

-(void)setHighlightedState:(BOOL)isHighlighted{

    highlighted = isHighlighted ;
   [self setTextColor:[CPColor colorWithRed:195/255
                                                     green:195/255
                                                      blue:195/255
                                                     alpha:1.0]];
    [self setBackgroundColor:[CPColor colorWithRed:91/255
                                               green:91/255
                                                blue:91/255
                                               alpha:1.0]];
}

-(void)setTitle:(CPString)aTitle {
  [self setTextColor:[CPColor whiteColor]];
  [super setTitle:aTitle+" "];
}

- (void)mouseEntered:(CPEvent)anEvent{
     if([self isEnabled]){
       [self setDefaultBackgroundColor];
       [self setTextColor:[CPColor whiteColor]];
     }

    if(toolTipString !=nil)
    {
      var mousePoint = [CPEvent mouseLocation];
      mousePoint.y += CURSOR_HEIGHT +2;
      [[CPApp delegate] showTooltip:[self toolTipString] atPoint:mousePoint delay:YES];
    }
}

- (void)mouseExited:(CPEvent)anEvent{

    if(!highlighted){
      [self setHighlightedState:highlighted];
    }
    else if([self isEnabled]){
     [self setDefaultBackgroundColor];
    }

    if(toolTipString !=nil)
    {
      [[CPApp delegate] disposeTooltip:[self toolTipString]];
    }
}

@end
