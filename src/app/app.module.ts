import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutModule } from 'src/app/components/layout.module';
import { reducers } from './store';
import { StoreModule } from '@ngrx/store';
import { MatrixEffects } from './store/matrix/effects';
import { ActionsEffects } from './store/actions/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoefficientsEffects } from './store/coefficients/effects';
import { PolynomsEffects } from './store/polynoms/effects';
import { TestVectorsEffects } from './store/test-vectors/effects';
import { ResultVectorEffects } from './store/result-vectors/effects';
import { DigitalSignatureEffects } from './store/digital-signature/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LayoutModule,
    StoreModule.forRoot(reducers),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([
      MatrixEffects,
      ActionsEffects,
      CoefficientsEffects,
      PolynomsEffects,
      TestVectorsEffects,
      ResultVectorEffects,
      DigitalSignatureEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
