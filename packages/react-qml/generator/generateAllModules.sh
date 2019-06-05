#!/bin/bash

# generate type definitions in json
node parse.js qmltypes/QtQml.qmltypes > jsontypes/QtQml.json
node parse.js qmltypes/QtQuick.qmltypes > jsontypes/QtQuick.json
node parse.js qmltypes/QtQmlModels.qmltypes > jsontypes/QtQmlModels.json
node parse.js qmltypes/QtLabsCalendar.qmltypes > jsontypes/QtLabsCalendar.json
node parse.js qmltypes/QtLabsPlatform.qmltypes > jsontypes/QtLabsPlatform.json
node parse.js qmltypes/QtLabsSettings.qmltypes > jsontypes/QtLabsSettings.json
node parse.js qmltypes/QtQuickLocalStorage.qmltypes > jsontypes/QtQuickLocalStorage.json
node parse.js qmltypes/QtQuickParticles.qmltypes > jsontypes/QtQuickParticles.json
node parse.js qmltypes/QtQuickShapes.qmltypes > jsontypes/QtQuickShapes.json
node parse.js qmltypes/QtQuickLayouts.qmltypes > jsontypes/QtQuickLayouts.json
node parse.js qmltypes/QtQuickWindow.qmltypes > jsontypes/QtQuickWindow.json
node parse.js qmltypes/QtQuickControls2.qmltypes > jsontypes/QtQuickControls2.json
node parse.js qmltypes/QtTest.qmltypes > jsontypes/QtTest.json
node parse.js qmltypes/QtAudioEngine.qmltypes > jsontypes/QtAudioEngine.json
node parse.js qmltypes/QtMultimedia.qmltypes > jsontypes/QtMultimedia.json


node ./generateModule.js qmltypes/QtQml.qmltypes QtQml
node ./generateTypes.js jsontypes/QtQml.json QtQml

node ./generateModule.js qmltypes/QtQuick.qmltypes QtQuick
node ./generateTypes.js jsontypes/QtQuick.json QtQuick

node ./generateModule.js qmltypes/QtQmlModels.qmltypes QtQmlModels
node ./generateTypes.js jsontypes/QtQmlModels.json QtQmlModels

node ./generateModule.js qmltypes/QtLabsCalendar.qmltypes QtLabsCalendar
node ./generateTypes.js jsontypes/QtLabsCalendar.json QtLabsCalendar

node ./generateModule.js qmltypes/QtLabsPlatform.qmltypes QtLabsPlatform
node ./generateTypes.js jsontypes/QtLabsPlatform.json QtLabsPlatform

node ./generateModule.js qmltypes/QtLabsSettings.qmltypes QtLabsSettings
node ./generateTypes.js jsontypes/QtLabsSettings.json QtLabsSettings

node ./generateModule.js qmltypes/QtQuickLocalStorage.qmltypes QtQuickLocalStorage
node ./generateTypes.js jsontypes/QtQuickLocalStorage.json QtQuickLocalStorage

node ./generateModule.js qmltypes/QtQuickParticles.qmltypes QtQuickParticles
node ./generateTypes.js jsontypes/QtQuickParticles.json QtQuickParticles

node ./generateModule.js qmltypes/QtQuickShapes.qmltypes QtQuickShapes
node ./generateTypes.js jsontypes/QtQuickShapes.json QtQuickShapes

node ./generateModule.js qmltypes/QtQuickLayouts.qmltypes QtQuickLayouts
node ./generateTypes.js jsontypes/QtQuickLayouts.json QtQuickLayouts

node ./generateModule.js qmltypes/QtQuickWindow.qmltypes QtQuickWindow
node ./generateTypes.js jsontypes/QtQuickWindow.json QtQuickWindow

node ./generateModule.js qmltypes/QtTest.qmltypes QtTest
node ./generateTypes.js jsontypes/QtTest.json QtTest

node ./generateModule.js qmltypes/QtAudioEngine.qmltypes QtAudioEngine
node ./generateTypes.js jsontypes/QtAudioEngine.json QtAudioEngine

node ./generateModule.js qmltypes/QtMultimedia.qmltypes QtMultimedia
node ./generateTypes.js jsontypes/QtMultimedia.json QtMultimedia

node ./generateModule.js qmltypes/QtQuickControls2.qmltypes QtQuickControls2
node ./generateTypes.js jsontypes/QtQuickControls2.json QtQuickControls2
