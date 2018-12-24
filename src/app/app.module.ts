/*
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { JHI_PIPES, JHI_DIRECTIVES, JHI_COMPONENTS } from './jhi-components';
import {
  JhiMissingTranslationHandler,
  JhiTranslateComponent,
  JhiLanguageService
} from './language';
import { JhiModuleConfig } from './config';
import { JhiConfigService } from './config.service';
import { JhiAlertService, JhiPaginationUtil, JhiResolvePagingParams } from './service';
import { AppComponent } from './app.component';

// Re export the files
export * from './pipe';
export * from './directive';
export * from './service';
export * from './component';
export * from './language';
export * from './config.service';
export * from './config';

export function translatePartialLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', `.json`);
}

export function missingTranslationHandler(configService: JhiConfigService) {
  return new JhiMissingTranslationHandler(configService);
}

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
        deps: [JhiConfigService]
      }
    }),
    CommonModule
  ],
  declarations: [
    ...JHI_PIPES,
    ...JHI_DIRECTIVES,
    ...JHI_COMPONENTS,
    JhiTranslateComponent,
    AppComponent
  ],
  exports: [
    ...JHI_PIPES,
    ...JHI_DIRECTIVES,
    ...JHI_COMPONENTS,
    JhiTranslateComponent,
    TranslateModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class NgJhipsterModule {
  static forRoot(moduleConfig: JhiModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgJhipsterModule,
      providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService, deps: [TranslateService, JhiConfigService] },
        { provide: JhiResolvePagingParams, useClass: JhiResolvePagingParams, deps: [JhiPaginationUtil] },
        { provide: JhiAlertService, useClass: JhiAlertService, deps: [Sanitizer, JhiConfigService, TranslateService] },
        { provide: JhiModuleConfig, useValue: moduleConfig },
        { provide: JhiConfigService, useClass: JhiConfigService, deps: [JhiModuleConfig] }
      ]
    };
  }
  static forChild(moduleConfig: JhiModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgJhipsterModule,
      providers: [
        { provide: JhiModuleConfig, useValue: moduleConfig },
      ]
    };
  }
}
