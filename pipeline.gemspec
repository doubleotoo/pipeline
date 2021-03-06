# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "pipeline/version"

Gem::Specification.new do |s|
  s.name        = "pipeline"
  s.version     = Pipeline::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Avlok Kohli"]
  s.email       = ["avlok@legalreach.com"]
  s.homepage    = ""
  s.summary     = %q{}
  s.description = %q{}

  s.rubyforge_project = "pipeline"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
end
