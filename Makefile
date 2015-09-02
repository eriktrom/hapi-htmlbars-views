# Test
test:
	@node node_modules/lab/bin/lab --colors -a code

# Test on save
auto-test:
	@nodemon node_modules/lab/bin/lab --colors -a code -t 100 -Lv

# Test with coverage
test-cov:
	@node node_modules/lab/bin/lab --colors -a code -t 100 -Lv

# Test with coverage reported to html
test-cov-html:
	@node node_modules/lab/bin/lab --colors -a code -r html -o coverage.html


.PHONY: test test-cov auto-test-cov test-cov-html
