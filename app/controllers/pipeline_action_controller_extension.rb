module PipelineActionControllerExtension
 	def self.included(base)
		base.send(:include, InstanceMethods) 
		#base.before_filter :my_method_1
		#base.after_filter :my_method_2
 	end

	module InstanceMethods
		def render_for_pipeline(partial, locals)
			if !partial.blank?
			  rendered_view = render_to_string(:partial => partial, :locals => locals[:locals])
			  rendered_view = rendered_view.gsub('"','\"').gsub(/[']/, '\\\\\'').gsub("//<![CDATA[", "").gsub("//]]>", "")
			end

			onload = ""
			onload = yield rendered_view

			render :json => {
			  :onload => onload.gsub(/[\n]+/, "").gsub(/[\t]+/,"")
			}
		end
	end
end