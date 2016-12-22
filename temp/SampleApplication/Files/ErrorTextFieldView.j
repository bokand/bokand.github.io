@implementation ErrorTextFieldView: CPTextField {

  BOOL isError @accessors;
  BOOL isErrorHighlighted @accessors;
  BOOL isWhiteBorderRequired;
}

- (id)initWithFrame:(CGRect)aFrame{
   self = [super initWithFrame:aFrame];

   if (self) {
      isError = NO;
      isErrorHighlighted = NO;
   }
   return self;
}

- (void)drawRect:(CPrect)aRect {
  [super drawRect:aRect];

  if(isErrorHighlighted) {
    [self drawRedBorderHighlighted:aRect]
  }else if (isError) {
    [self drawRedBorder:aRect]
  }
  else if (isWhiteBorderRequired){
    [self drawWhiteBorder:aRect]
  }
}

- (void)setIsError:(BOOL)displayError {
  isError = displayError;
  if (displayError == NO){
    isErrorHighlighted = displayError;
  }

  [self setNeedsDisplay:YES]
}

- (void)setWhiteBorder:(BOOL)aFlag
{
  isWhiteBorderRequired = aFlag;
  [self setNeedsDisplay:YES];
}

- (void)setIsErrorHighlighted:(BOOL)displayError {
  isErrorHighlighted = displayError;
  [self setNeedsDisplay:YES]
}

- (void)drawRedBorder:(CPrect)frame {
  var frameOriginX = frame.origin.x
  var frameOriginY = frame.origin.y
  var frameWidth   = CGRectGetWidth(frame)
  var frameHeight  = CGRectGetHeight(frame)
  var bezPath = [CPBezierPath bezierPath];
  [bezPath appendBezierPathWithRoundedRect:CGRectMake(frameOriginX,frameOriginY,frameWidth,frameHeight) xRadius:3 yRadius:3]

  [bezPath setLineWidth:4.0];
  [[CPColor redColor] setStroke];
  [bezPath stroke];
}

- (void)drawWhiteBorder:(CPrect)frame {
  var frameOriginX = frame.origin.x
  var frameOriginY = frame.origin.y
  var frameWidth   = CGRectGetWidth(frame)
  var frameHeight  = CGRectGetHeight(frame)
  var bezPath = [CPBezierPath bezierPath];
  [bezPath appendBezierPathWithRoundedRect:CGRectMake(frameOriginX,frameOriginY,frameWidth,frameHeight) xRadius:3 yRadius:3]
  [bezPath setLineWidth:2.0];
  [[CPColor whiteColor] setStroke];
  [bezPath stroke];
}

- (void)drawRedBorderHighlighted:(CPrect)frame {
  var frameOriginX = frame.origin.x
  var frameOriginY = frame.origin.y
  var frameWidth   = CGRectGetWidth(frame)
  var frameHeight  = CGRectGetHeight(frame)
  var bezPath = [CPBezierPath bezierPath];
  [bezPath appendBezierPathWithRoundedRect:CGRectMake(frameOriginX,frameOriginY,frameWidth,frameHeight) xRadius:3 yRadius:3]

  [bezPath setLineWidth:4.0];
  [[CPColor redColor] setStroke];
  [bezPath stroke];
}

- (void)textDidFocus:(CPNotification)note {

  if(isError) {
    [self setIsErrorHighlighted:YES];
  }
  [super textDidFocus:note]
}

- (void)textDidBlur:(CPNotification)note {

  if(isError) {
    [self setIsErrorHighlighted:NO];
  }
  [super textDidBlur:note]
}

- (void)sizeToFit{
}

- (BOOL)becomeFirstResponder{
  var result = [super becomeFirstResponder];
  if(result)
    // [self performSelector:@selector(selectText:) withObject:self afterDelay:0]
    return result;
}
@end
