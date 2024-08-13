var G=Object.defineProperty;var U=(n,t,i)=>t in n?G(n,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[t]=i;var s=(n,t,i)=>(U(n,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();var g=(n=>(n[n.LEFT=1]="LEFT",n[n.RIGHT=2]="RIGHT",n))(g||{}),l=(n=>(n[n.DOWN=1]="DOWN",n[n.MOVE=2]="MOVE",n[n.UP=3]="UP",n[n.CANCEL=4]="CANCEL",n))(l||{});function x(n,t,i){return(1-i)*n+i*t}var L=(n=>(n[n.INITIAL=1]="INITIAL",n[n.ACTIVE=2]="ACTIVE",n[n.FINISHED=3]="FINISHED",n))(L||{});const Y=412,_=window.innerWidth,H=Math.min(_,Y);class W{constructor(){s(this,"mLinearDistance",H);s(this,"mMaxDistance",window.innerWidth);s(this,"mNonLinearFactor",0);s(this,"mLatestTouchX",0);s(this,"mLatestTouchY",0);s(this,"mTriggerBack",!1);s(this,"mInitTouchX",0);s(this,"mInitTouchY",0);s(this,"mLatestVelocityX",0);s(this,"mLatestVelocityY",0);s(this,"mStartThresholdX",0);s(this,"mSwipeEdge",g.LEFT);s(this,"mLastUpdateTime",null);s(this,"mState",1)}update(t,i,a,e){(t<this.mStartThresholdX&&this.mSwipeEdge===g.LEFT||t>this.mStartThresholdX&&this.mSwipeEdge===g.RIGHT)&&(this.mStartThresholdX=t,(this.mSwipeEdge===g.LEFT&&this.mStartThresholdX<this.mInitTouchX||this.mSwipeEdge===g.RIGHT&&this.mStartThresholdX>this.mInitTouchX)&&(this.mInitTouchX=this.mStartThresholdX));const r=performance.now();this.mLastUpdateTime||(this.mLastUpdateTime=r);const o=r-this.mLastUpdateTime;o==0||o>500?(this.mLatestVelocityX=0,this.mLatestVelocityY=0):(this.mLatestVelocityX=(t-this.mLatestTouchX)/(o/1e3),this.mLatestVelocityY=(i-this.mLatestTouchY)/(o/1e3)),this.mLastUpdateTime=r,this.mLatestTouchX=t,this.mLatestTouchY=i}setTriggerBack(t){this.mTriggerBack!==t&&!t&&(this.mStartThresholdX=this.mLatestTouchX),this.mTriggerBack=t}getTriggerBack(){return this.mTriggerBack}setState(t){this.mState=t}isInInitialState(){return this.mState===1}isActive(){return this.mState===2}isFinished(){return this.mState===3}setGestureStartLocation(t,i,a){this.mInitTouchX=t,this.mInitTouchY=i,this.mLatestTouchX=t,this.mLatestTouchY=i,this.mSwipeEdge=a,this.mStartThresholdX=this.mInitTouchX}updateStartLocation(){this.mInitTouchX=this.mLatestTouchX,this.mInitTouchY=this.mLatestTouchY,this.mStartThresholdX=this.mInitTouchX}reset(){this.mInitTouchX=0,this.mInitTouchY=0,this.mStartThresholdX=0,this.mTriggerBack=!1,this.mState=1,this.mSwipeEdge=g.LEFT}createStartEvent(t){return{x:this.mLatestTouchX,y:this.mLatestTouchY,progress:0,vx:0,vy:0,triggerBack:this.mTriggerBack,edge:this.mSwipeEdge,animation_target:null}}createProgressEvent(){const t=this.getProgress(this.mLatestTouchX);return this.createProgressEventFromProgress(t)}getProgress(t){const i=this.mTriggerBack?this.mInitTouchX:this.mStartThresholdX;let a;this.mSwipeEdge===g.LEFT?a=t-i:a=i-t;const e=Math.max(0,a);let r=this.mLinearDistance,o=this.getMaxDistance();o=o===0?1:o;let m;if(r<o){const h=o-r,u=r+h*this.mNonLinearFactor;if(e<=r)m=e/u;else{const I=(e-r)/h,E=x(u,o,I);m=e/E}}else m=e/o;return Math.min(Math.max(m,0),1)}getMaxDistance(){return this.mMaxDistance}createProgressEventFromProgress(t){return{x:this.mLatestTouchX,y:this.mLatestTouchY,progress:t,vx:this.mLatestVelocityX,vy:this.mLatestVelocityY,triggerBack:this.mTriggerBack,edge:this.mSwipeEdge,animation_target:null}}}function A(n,t,i,a,e){if(i<=0){e();return}const r=Math.ceil(i/16),o=(t-n)/r;requestAnimationFrame(()=>{a(n+o),A(n+o,t,i-16,a,e)})}class z{constructor(t){s(this,"controller");this.controller=t}onBackMotion(t,i,a,e,r,o){this.controller.onMotionEvent(t,i,a,e,r,o)}onPilferPointers(){this.controller.onPilferPointers()}setTriggerBack(t){this.controller.setTriggerBack(t)}}class ${constructor(t){s(this,"mBackGestureStarted",!1);s(this,"mPostCommitAnimationInProgress",!1);s(this,"mShouldStartOnNextMoveEvent",!1);s(this,"mOnBackStartDispatched",!1);s(this,"mPointerPilfered",!1);s(this,"mCurrentTracker");s(this,"mActiveCallback");s(this,"mBackAnimation");this.mCurrentTracker=new W,this.mActiveCallback=t,this.mBackAnimation=new z(this)}getActiveTracker(){return this.mCurrentTracker.isActive()?this.mCurrentTracker:null}onPilferPointers(){}onPointerDown(t){this.onMotionEvent(t.clientX,t.clientY,0,0,l.DOWN,g.LEFT)}onPointerUp(t){this.onMotionEvent(t.clientX,t.clientY,0,0,l.UP,g.LEFT)}onPointerCancel(t){this.onMotionEvent(t.clientX,t.clientY,0,0,l.CANCEL,g.LEFT)}onPointerMove(t){this.onMotionEvent(t.clientX,t.clientY,0,0,l.MOVE,g.LEFT)}onMotionEvent(t,i,a,e,r,o){let m=this.getActiveTracker();m!=null&&r!==l.UP&&m.update(t,i,a,e),!this.mCurrentTracker.isFinished()&&(r===l.DOWN?this.mBackGestureStarted||(this.mShouldStartOnNextMoveEvent=!0):r===l.MOVE?(!this.mBackGestureStarted&&this.mShouldStartOnNextMoveEvent&&(this.onGestureStarted(t,i,o),this.mShouldStartOnNextMoveEvent=!1),this.onMove()):(r===l.UP||r===l.CANCEL)&&(r===l.CANCEL&&this.setTriggerBack(!1),this.onGestureFinished()))}onGestureStarted(t,i,a){let e;if(this.mCurrentTracker.isInInitialState())e=this.mCurrentTracker;else return;e.setGestureStartLocation(t,i,a),e.setState(L.ACTIVE),this.mBackGestureStarted=!0,this.tryDispatchOnBackStarted(this.mActiveCallback,e.createStartEvent(null))}onMove(){if(!this.mBackGestureStarted||!this.mOnBackStartDispatched)return;const t=this.mCurrentTracker.createProgressEvent();this.dispatchOnBackProgressed(this.mActiveCallback,t)}tryDispatchOnBackStarted(t,i){this.mOnBackStartDispatched||this.dispatchOnBackStarted(t,i)}dispatchOnBackStarted(t,i){t.onBackStarted(i),this.mOnBackStartDispatched=!0}dispatchOrAnimateOnBackInvoked(t,i){let a=!1;const e=this.mCurrentTracker.getMaxDistance(),r=this.mCurrentTracker.createProgressEvent();let o=250,m=3e3,h=e*.3,u=r.x,B=Math.min(Math.max(-m,r.vx),m),I=B/m*h,E=Math.min(Math.max(u+I,0),e);if(!Number.isNaN(E)&&u!=E&&Math.abs(B)>=o){let y=R=>{let X=i.getProgress(R),q=i.createProgressEventFromProgress(X);this.dispatchOnBackProgressed(this.mActiveCallback,q)},O=()=>this.dispatchOnBackInvoked(t);console.log("FLINGING"),A(u,E,200*250/B,y,O),a=!0}a||this.dispatchOnBackInvoked(t)}dispatchOnBackInvoked(t){this.onBackAnimationFinished(),t.onBackInvoked()}dispatchOnBackCancelled(t){this.onBackAnimationFinished(),t.onBackCancelled()}dispatchOnBackProgressed(t,i){t.onBackProgressed(i)}setTriggerBack(t){const i=this.getActiveTracker();i!=null&&i.setTriggerBack(t)}invokeOrCancelBack(t){this.finishBackNavigation(t.getTriggerBack())}onGestureFinished(){const t=this.getActiveTracker();!this.mBackGestureStarted||t==null||(t.getTriggerBack(),this.mBackGestureStarted=!1,t.setState(L.FINISHED),!this.mPostCommitAnimationInProgress&&this.startPostCommitAnimation())}startPostCommitAnimation(){this.mPostCommitAnimationInProgress||(this.mPostCommitAnimationInProgress=!0,this.mCurrentTracker.getTriggerBack()?this.dispatchOrAnimateOnBackInvoked(this.mActiveCallback,this.mCurrentTracker):this.dispatchOnBackCancelled(this.mActiveCallback))}onBackAnimationFinished(){this.mPostCommitAnimationInProgress=!1,(this.mCurrentTracker.isActive()||this.mCurrentTracker.isFinished())&&this.invokeOrCancelBack(this.mCurrentTracker),this.resetTouchTracker()}resetTouchTracker(){if(this.mCurrentTracker.reset(),this.mCurrentTracker.isInInitialState()){this.mBackGestureStarted&&(this.mBackGestureStarted=!1,this.dispatchOnBackCancelled(this.mActiveCallback),this.finishBackNavigation(!1));return}this.mCurrentTracker.isFinished()&&this.mCurrentTracker.getTriggerBack()?(this.finishBackNavigation(!0),this.mCurrentTracker.reset()):this.mCurrentTracker.isFinished()&&this.mCurrentTracker.reset()}finishBackNavigation(t){this.mShouldStartOnNextMoveEvent=!1,this.mOnBackStartDispatched=!1,this.mPointerPilfered=!1}}function D(n,t,i,a){if(i<=0)return;const e=Math.ceil(i/16),r=(t-n)/e;requestAnimationFrame(()=>{a(n+r),D(n+r,t,i-16,a)})}const M=class M{constructor(t){s(this,"mBackCallback");s(this,"mMinDeltaForSwitch",32);s(this,"mSwipeTriggerThreshold",16);s(this,"mSwipeProgressThreshold",412);s(this,"mIsLeftPanel",!0);s(this,"mBaseTranslation",M.BASE_TRANSLATION_DP);s(this,"mStartX",0);s(this,"mStartY",0);s(this,"mCurrentTranslation",0);s(this,"mDesiredTranslation",0);s(this,"mDragSlopPassed",!1);s(this,"mArrowsPointLeft",!0);s(this,"mMaxTranslation",70);s(this,"mTriggerBack",!1);s(this,"mPreviousTouchTranslation",0);s(this,"mTotalTouchDelta",0);this.mBackCallback=t}onMotionEvent(t,i){switch(i){case l.DOWN:this.mDragSlopPassed=!1,this.resetOnDown(),this.mStartX=t.clientX,this.mStartY=t.clientY;break;case l.MOVE:this.handleMoveEvent(t);break;case l.UP:this.mTriggerBack?this.triggerBack():this.cancelBack();break;case l.CANCEL:this.cancelBack();break}}onPointerDown(t){this.onMotionEvent(t,l.DOWN)}onPointerUp(t){this.onMotionEvent(t,l.UP)}onPointerCancel(t){this.onMotionEvent(t,l.CANCEL)}onPointerMove(t){this.onMotionEvent(t,l.MOVE)}triggerBack(){this.mBackCallback.triggerBack(),this.setDesiredTranslation(0,!0)}cancelBack(){this.mBackCallback.cancelBack()}resetOnDown(){this.setTriggerBack(!1,!1),this.setDesiredTranslation(0,!1),this.setCurrentTranslation(0),this.mPreviousTouchTranslation=0,this.mTotalTouchDelta=0}signum(t){return t===0||Number.isNaN(t)?t:Math.sign(t)}saturate(t){return Math.min(1,Math.max(0,t))}handleMoveEvent(t){const i=t.clientX>this.mStartX?t.clientX:this.mStartX,a=t.clientY;let e=Math.abs(i-this.mStartX);const r=a-this.mStartY;let o=e-this.mPreviousTouchTranslation;if(Math.abs(o)>0&&(this.signum(o)===this.signum(this.mTotalTouchDelta)?this.mTotalTouchDelta+=o:this.mTotalTouchDelta=o),this.mPreviousTouchTranslation=e,!this.mDragSlopPassed&&e>this.mSwipeTriggerThreshold&&(this.mDragSlopPassed=!0,navigator.vibrate(1),this.setTriggerBack(!0,!0)),e>this.mBaseTranslation){const h=e-this.mBaseTranslation;let u=this.saturate(h/(window.innerWidth-this.mBaseTranslation));u=u*(this.mMaxTranslation-this.mBaseTranslation),e=this.mBaseTranslation+u}else{const h=this.mBaseTranslation-e;let u=this.saturate(h/this.mBaseTranslation);u=u*(this.mBaseTranslation/4),e=this.mBaseTranslation-u}let m=this.mTriggerBack;if(Math.abs(this.mTotalTouchDelta)>this.mMinDeltaForSwitch){let h=m;m=this.mTotalTouchDelta>0,!h&&m&&navigator.vibrate(1)}Math.abs(r)>Math.abs(i-this.mStartX)*2&&(m=!1),this.setTriggerBack(m,!0),this.mTriggerBack?this.mIsLeftPanel&&this.mArrowsPointLeft||!this.mIsLeftPanel&&this.mArrowsPointLeft:e=0,this.setDesiredTranslation(e,!0)}setTriggerBack(t,i){this.mTriggerBack!==t&&(this.mTriggerBack=t,this.mBackCallback.setTriggerBack(this.mTriggerBack))}setDesiredTranslation(t,i){this.mDesiredTranslation!=t&&(this.mDesiredTranslation=t,i?D(this.mCurrentTranslation,this.mDesiredTranslation,64,a=>(this.setCurrentTranslation(a),Math.abs(this.mCurrentTranslation-this.mDesiredTranslation)<2)):this.setCurrentTranslation(t))}setCurrentTranslation(t){this.mCurrentTranslation=t,this.mBackCallback.updatedChevrons(this.mCurrentTranslation,this.mStartY-80)}};s(M,"BASE_TRANSLATION_DP",50);let N=M;class K{constructor(){s(this,"mValue",0);s(this,"mVelocity",0)}}const c=class c{constructor(t){s(this,"mNaturalFreq",Math.sqrt(c.STIFFNESS_MEDIUM));s(this,"mDampingRatio",c.DAMPING_RATIO_MEDIUM_BOUNCY);s(this,"mInitialized",!1);s(this,"mValueThreshold",0);s(this,"mVelocityThreshold",0);s(this,"mGammaPlus",0);s(this,"mGammaMinus",0);s(this,"mDampedFreq",0);s(this,"mFinalPosition",c.UNSET);s(this,"mMassState",new K);t!==void 0&&(this.mFinalPosition=t)}setStiffness(t){if(t<=0)throw new Error("Spring stiffness constant must be positive.");return this.mNaturalFreq=Math.sqrt(t),this.mInitialized=!1,this}getStiffness(){return this.mNaturalFreq*this.mNaturalFreq}setDampingRatio(t){if(t<0)throw new Error("Damping ratio must be non-negative");return this.mDampingRatio=t,this.mInitialized=!1,this}getDampingRatio(){return this.mDampingRatio}setFinalPosition(t){return this.mFinalPosition=t,this}getFinalPosition(){return this.mFinalPosition}getAcceleration(t,i){t-=this.getFinalPosition();const a=this.mNaturalFreq*this.mNaturalFreq,e=2*this.mNaturalFreq*this.mDampingRatio;return-a*t-e*i}isAtEquilibrium(t,i){return Math.abs(i)<this.mVelocityThreshold&&Math.abs(t-this.getFinalPosition())<this.mValueThreshold}init(){if(!this.mInitialized){if(this.mFinalPosition===c.UNSET)throw new Error("Error: Final position of the spring must be set before the animation starts");this.mDampingRatio>1?(this.mGammaPlus=-this.mDampingRatio*this.mNaturalFreq+this.mNaturalFreq*Math.sqrt(this.mDampingRatio*this.mDampingRatio-1),this.mGammaMinus=-this.mDampingRatio*this.mNaturalFreq-this.mNaturalFreq*Math.sqrt(this.mDampingRatio*this.mDampingRatio-1)):this.mDampingRatio>=0&&this.mDampingRatio<1&&(this.mDampedFreq=this.mNaturalFreq*Math.sqrt(1-this.mDampingRatio*this.mDampingRatio)),this.mInitialized=!0}}updateValues(t,i,a){this.init();const e=a/1e3;t-=this.mFinalPosition;let r,o;if(this.mDampingRatio>1){const m=t-(this.mGammaMinus*t-i)/(this.mGammaMinus-this.mGammaPlus),h=(this.mGammaMinus*t-i)/(this.mGammaMinus-this.mGammaPlus);r=m*Math.pow(Math.E,this.mGammaMinus*e)+h*Math.pow(Math.E,this.mGammaPlus*e),o=m*this.mGammaMinus*Math.pow(Math.E,this.mGammaMinus*e)+h*this.mGammaPlus*Math.pow(Math.E,this.mGammaPlus*e)}else if(this.mDampingRatio===1){const m=t,h=i+this.mNaturalFreq*t;r=(m+h*e)*Math.pow(Math.E,-this.mNaturalFreq*e),o=(m+h*e)*Math.pow(Math.E,-this.mNaturalFreq*e)*-this.mNaturalFreq+h*Math.pow(Math.E,-this.mNaturalFreq*e)}else{const m=t,h=1/this.mDampedFreq*(this.mDampingRatio*this.mNaturalFreq*t+i);r=Math.pow(Math.E,-this.mDampingRatio*this.mNaturalFreq*e)*(m*Math.cos(this.mDampedFreq*e)+h*Math.sin(this.mDampedFreq*e)),o=r*-this.mNaturalFreq*this.mDampingRatio+Math.pow(Math.E,-this.mDampingRatio*this.mNaturalFreq*e)*(-this.mDampedFreq*m*Math.sin(this.mDampedFreq*e)+this.mDampedFreq*h*Math.cos(this.mDampedFreq*e))}return this.mMassState.mValue=r+this.mFinalPosition,this.mMassState.mVelocity=o,this.mMassState}setValueThreshold(t){this.mValueThreshold=Math.abs(t),this.mVelocityThreshold=this.mValueThreshold*c.VELOCITY_THRESHOLD_MULTIPLIER}};s(c,"STIFFNESS_HIGH",1e4),s(c,"STIFFNESS_MEDIUM",1500),s(c,"STIFFNESS_LOW",200),s(c,"STIFFNESS_VERY_LOW",50),s(c,"DAMPING_RATIO_HIGH_BOUNCY",.2),s(c,"DAMPING_RATIO_MEDIUM_BOUNCY",.5),s(c,"DAMPING_RATIO_LOW_BOUNCY",.75),s(c,"DAMPING_RATIO_NO_BOUNCY",1),s(c,"VELOCITY_THRESHOLD_MULTIPLIER",1e3/16),s(c,"UNSET",Number.MAX_VALUE);let k=c;const d=class d{constructor(t,i,a){s(this,"mSpring",null);s(this,"mPendingPosition",Number.MAX_VALUE);s(this,"mEndRequested",!1);s(this,"writeCb");s(this,"readCb");s(this,"doneCb",null);s(this,"mLastFrameTime",0);s(this,"mMinVisibleChange",0);s(this,"mRunning",!1);s(this,"mStartValueIsSet",!1);s(this,"mValue",d.UNSET);s(this,"mVelocity",0);this.writeCb=t,this.readCb=i,this.doneCb=a}getSpring(){return this.mSpring}setSpring(t){return this.mSpring=t,this}rafHandler(){const t=performance.now();let i=!1;if(this.mLastFrameTime==0)this.mLastFrameTime=t,this.writeCb(this.mValue);else{let a=t-this.mLastFrameTime;this.mLastFrameTime=t,i=this.updateValueAndVelocity(a),this.writeCb(this.mValue)}i?this.endAnimationInternal(!1):requestAnimationFrame(this.rafHandler.bind(this))}endAnimationInternal(t){this.mRunning=!1,this.mLastFrameTime=0,this.mStartValueIsSet=!1}start(){this.sanityCheck(),this.mSpring&&this.mSpring.setValueThreshold(this.getValueThreshold()),this.mRunning||(this.mRunning=!0,this.mStartValueIsSet||(this.mValue=this.readCb()),requestAnimationFrame(this.rafHandler.bind(this)))}animateToFinalPosition(t){this.mRunning?this.mPendingPosition=t:(this.mSpring==null?this.mSpring=new k(t):this.mSpring.setFinalPosition(t),this.start())}cancel(){this.mRunning&&this.endAnimationInternal(!0),this.mPendingPosition!==d.UNSET&&(this.mSpring==null?this.mSpring=new k(this.mPendingPosition):this.mSpring.setFinalPosition(this.mPendingPosition),this.mPendingPosition=d.UNSET)}skipToEnd(){if(!this.canSkipToEnd())throw new Error("Spring animations can only come to an end when there is damping");this.mRunning&&(this.mEndRequested=!0)}canSkipToEnd(){return this.mSpring!==null&&this.mSpring.mDampingRatio>0}sanityCheck(){if(this.mSpring==null)throw new Error("Incomplete SpringAnimation: Either final position or a spring force needs to be set.")}updateValueAndVelocity(t){if(this.mEndRequested)return this.mPendingPosition!==d.UNSET&&(this.mSpring&&this.mSpring.setFinalPosition(this.mPendingPosition),this.mPendingPosition=d.UNSET),this.mValue=this.mSpring?this.mSpring.getFinalPosition():0,this.mVelocity=0,this.mEndRequested=!1,!0;if(this.mPendingPosition!==d.UNSET){let i;this.mSpring?(i=this.mSpring.updateValues(this.mValue,this.mVelocity,t/2),this.mSpring.setFinalPosition(this.mPendingPosition)):i={mValue:this.mValue,mVelocity:this.mVelocity},this.mPendingPosition=d.UNSET,this.mSpring&&(i=this.mSpring.updateValues(i.mValue,i.mVelocity,t/2)),this.mValue=i.mValue,this.mVelocity=i.mVelocity}else if(this.mSpring){const i=this.mSpring.updateValues(this.mValue,this.mVelocity,t);this.mValue=i.mValue,this.mVelocity=i.mVelocity}return this.isAtEquilibrium(this.mValue,this.mVelocity)?(this.mValue=this.mSpring?this.mSpring.getFinalPosition():0,this.mVelocity=0,!0):!1}getAcceleration(t,i){return this.mSpring?this.mSpring.getAcceleration(t,i):0}isAtEquilibrium(t,i){return this.mSpring?this.mSpring.isAtEquilibrium(t,i):!1}setValueThreshold(t){}getValueThreshold(){return .75}};s(d,"UNSET",Number.MAX_VALUE);let v=d;const S=class S{constructor(){s(this,"mSpring");s(this,"mCallback",null);s(this,"mProgress",0);s(this,"mLastBackEvent",null);s(this,"mBackAnimationInProgress",!1);s(this,"mBackCancelledFinishRunnable",null);s(this,"mOnAnimationEndListener",()=>{this.invokeBackCancelledRunnable(),this.reset()});this.mSpring=new v(i=>{i=Math.min(S.SCALE_FACTOR,Math.max(0,i)),this.setProgress(i),this.updateProgressValue(i)},()=>this.getProgress(),null);const t=new k;t.setStiffness(k.STIFFNESS_MEDIUM),t.setDampingRatio(k.DAMPING_RATIO_NO_BOUNCY),this.mSpring.setSpring(t)}setProgress(t){this.mProgress=t}getProgress(){return this.mProgress}onBackProgressed(t){this.mBackAnimationInProgress&&(this.mLastBackEvent=t,this.mSpring!=null&&this.mSpring.animateToFinalPosition(t.progress*S.SCALE_FACTOR))}onBackStarted(t,i){this.reset(),this.mLastBackEvent=t,this.mCallback=i,this.mBackAnimationInProgress=!0,this.updateProgressValue(0)}reset(){this.mBackCancelledFinishRunnable!=null&&(this.updateProgressValue(0),this.invokeBackCancelledRunnable()),this.mSpring.animateToFinalPosition(0),this.mSpring.canSkipToEnd()?this.mSpring.skipToEnd():this.mSpring.cancel(),this.mBackAnimationInProgress=!1,this.mLastBackEvent=null,this.mCallback=null,this.mProgress=0}onBackCancelled(t){this.mBackCancelledFinishRunnable=t,this.mSpring.doneCb=t,this.mSpring.animateToFinalPosition(0)}isBackAnimationInProgress(){return this.mBackAnimationInProgress}updateProgressValue(t){if(this.mLastBackEvent==null||this.mCallback==null||!this.mBackAnimationInProgress)return;const i=this.mLastBackEvent.x,a=this.mLastBackEvent.y,e=this.mLastBackEvent.vx,r=this.mLastBackEvent.vy,o=t/S.SCALE_FACTOR,m=this.mLastBackEvent.edge,h=this.mLastBackEvent.triggerBack;this.mCallback.onProgressUpdate({x:i,y:a,progress:o,vx:e,vy:r,triggerBack:h,edge:m,animation_target:null})}invokeBackCancelledRunnable(){this.mBackCancelledFinishRunnable&&this.mBackCancelledFinishRunnable(),this.mBackCancelledFinishRunnable=null}};s(S,"SCALE_FACTOR",100);let F=S;const f=[{src:"resources/photos2.png",timeline:"--progress-timeline",animation:"photosshrink",bganimation:"photosshrinkbg"},{src:"resources/photos1.png",timeline:"--progress-timeline",animation:"builtinback"},{src:"resources/cnn3.png",timeline:"--progress-timeline",animation:""},{src:"resources/cnn2.png",timeline:"--progress-timeline",animation:""},{src:"resources/cnn1.png",timeline:"--progress-timeline",animation:"builtinback"},{src:"resources/gmail3.png",timeline:"--progress-timeline",animation:"gmailshrink"},{src:"resources/gmail2.png",timeline:"--progress-timeline",animation:"slidefromleft",incomingTransform:"translateX(-100vw)"},{src:"resources/gmail1.png",timeline:"--progress-timeline",animation:"builtinback"},{src:"resources/mdn3.png",timeline:"--progress-timeline",animation:"fade"},{src:"resources/mdn2.png",timeline:"--progress-timeline",animation:"fade"},{src:"resources/mdn1.png",timeline:"--progress-timeline",animation:"builtinback"},{src:"resources/wiki4.png",timeline:"--progress-timeline",animation:"spin"},{src:"resources/wiki3.png",timeline:"--progress-timeline",animation:"spin"},{src:"resources/wiki2.png",timeline:"--progress-timeline",animation:"spin"},{src:"resources/wiki1.png",timeline:"--progress-timeline",animation:"builtinback"}];function j(n){const t=document.getElementById("progressScroller");t.scrollTop=n*1e4}addEventListener("keydown",()=>console.log("##################"));function J(n){j(n.progress)}const P=new F,p=new $({onBackStarted:n=>{P.onBackStarted(n,{onProgressUpdate:J})},onBackProgressed:n=>{P.onBackProgressed(n)},onBackCancelled:()=>{document.getElementById("progressScroller"),P.onBackCancelled(()=>{})},onBackInvoked:()=>{Z(),P.reset()}}),C=new N({triggerBack:function(){p.setTriggerBack(!0)},cancelBack:function(){p.setTriggerBack(!1)},setTriggerBack:function(n){p.setTriggerBack(n)},updatedChevrons:function(n,t){const i=document.getElementById("chevrons");i.style.left=`${n-50}px`,i.style.width=`${50+10*(n/70)**3}px`,i.style.top=`${Math.max(0,t)}px`}});let T=!1;window.onload=()=>{const n=document.getElementById("backarea");n.addEventListener("pointerdown",t=>{T||(T=!0,C.onPointerDown(t),p.onPointerDown(t),n.setPointerCapture(t.pointerId))}),n.addEventListener("pointerup",t=>{T&&(T=!1,C.onPointerUp(t),p.onPointerUp(t),n.releasePointerCapture(t.pointerId))}),n.addEventListener("pointercancel",t=>{T&&(T=!1,C.onPointerCancel(t),p.onPointerCancel(t),n.releasePointerCapture(t.pointerId))}),n.addEventListener("pointermove",t=>{T&&(C.onPointerMove(t),p.onPointerMove(t))}),Q()};let b=Number.parseInt(window.location.hash.substring(1));Number.isNaN(b)&&(b=f.length-1);function Q(){f.forEach((n,t)=>{if(t>b)return;const i=document.getElementById("stack");if("bganimation"in n){const a=document.createElement("div");a.id=`img${t}`,a.className="screen",a.style.width="100%",a.style.height="100%",a.style.animationDuration="100ms";const e=document.createElement("div");e.style.width="100%",e.style.height="100%",e.style.backgroundColor="black",e.style.animationName=n.bganimation,e.className="bg",e.style.animationTimeline=n.timeline,e.style.animationFillMode="both",a.appendChild(e);const r=document.createElement("img");r.src=n.src,r.id=`img${t}`,r.className="screen",r.style.height="100%",a.appendChild(r),i.insertBefore(a,i.firstElementChild)}else{const a=document.createElement("img");a.src=n.src,a.id=`img${t}`,a.className="screen",i.insertBefore(a,i.firstElementChild)}}),V()}function V(){const t=document.getElementById("stack").lastElementChild;if(!t)return;const i=Number.parseInt(t.id.substring(3));let a=t;if("incomingTransform"in f[i]&&(a=t.previousElementSibling),a.classList.add("top"),a.classList.add("active"),a.style.animationName=f[i].animation,"bganimation"in f[i]){const e=a.querySelector(".bg");e.style.animationName=f[i].bganimation,e.style.animationTimingFunction="cubic-bezier(0.04, 0.91, 0.01, 1.05)",a.style.animationTimingFunction="cubic-bezier(0.24, 0.77, 0.7, 0.99)"}}function Z(){const n=document.getElementById("stack"),t=n.querySelector(".active");t.classList.add("end");let i=()=>{t.classList.remove("active"),t.classList.remove("end"),t.classList.remove("top"),t.style.animationName="",t.style.transform="",t.style.opacity="";const a=t.querySelector(".bg");a&&(a.style.animationName="");const e=n.lastElementChild;n.insertBefore(e,n.firstElementChild),document.getElementById("progressScroller").scrollTop=0,V()};if(t.getAnimations().length>0){t.getAnimations()[0].commitStyles();const a=Number.parseInt(n.lastElementChild.id.substring(3));t.style.animationName=`${f[a].animation}end`,t.getAnimations()[0].addEventListener("finish",i)}else i()}
