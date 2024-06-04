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
| [Lexical Framework](https://github.com/facebook/lexical/)

## Tests

The plugin depends on a versatile regex pattern to handle matching.  There is a large amount of variations of text
for which URL matches are tested against.  To see these, check out the `tests/unit/expectations.ts` file.  You are
welcome to build upon these by adding additional expectations to that file, and modifying the corresponding `regex.test.ts`
file.

If you believe you found a common variation that is not accounted for, please raise an issue.  It is of course not possible
to account for every single URL variation using regex, but this plugin aims to handle 95% of cases.