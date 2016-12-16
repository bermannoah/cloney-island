class ProjectsController < ApplicationController

  def new
    @project = Project.new
    @categories = Category.all
  end

  def show
    @project = Project.find_by_slug(params[:project])
  end

  def create
    @project = ProjectBuilder.new(project_params).build
    if @project.save
      redirect_to project_path(project: @project.title.parameterize)
    else
      redirect_to new_project_path
    end
  end

  def edit
    @project = Project.find_by(slug: params[:project])
  end

  def update
    @project = Project.find_by(slug: params[:id])
    @project.update(project_params)
      if @project.update
      redirect_to project_path(project.slug)
    else
      render :edit
    end
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :goal, :slug, :category_id)
  end
end
