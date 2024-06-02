# Lexical AnchorPoint :anchor:

A revision of the AutoLink plugin with improvements on URL matching.

The goal of this plugin is to provide an alternative to the AutoLink plugin distributed with Lexical's React package.

Parts of this plugin are inspired by the AutoLink plugin, however AnchorPoint selectively implements the
behavior provided there, and puts a core focus on matching URLs reliably, through robust regex tests and increased
flexibility.

Unfortunately, the existing AutoLink plugin has core issues that would require a lot of rework, so
rather than merging substantial changes into that package, this repository provides a centralized place to start fresh and
build a simple, yet effective link matching plugin.

This plugin is in the early stages and does not yet fully implement all functionality provided by the original AutoLink
plugin, but it addresses the glaring issues that have been identified consistently by users of Lexical.

[Installation instructions](https://redstar504.github.io/lexical-anchorpoint/)