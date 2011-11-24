module Pipeline
	class Engine < Rails::Engine
		initializer 'pipeline.controller' do |app|  
			ActiveSupport.on_load(:action_controller) do  
				include PipelineActionControllerExtension  
			end
		end
	end
end