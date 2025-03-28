import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../services/projectService';
import { setProjects } from '../store/projectSlice';
import { fetchTasks } from '../services/taskService';
import { setTasks } from '../store/taskSlice';
import StatsCard from '../components/StatsCard';
import RecentProjects from '../components/RecentProjects';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await fetchProjects();
        dispatch(setProjects(projectsData));
        
        const tasksData = await fetchTasks();
        dispatch(setTasks(tasksData));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };
    
    loadData();
  }, [dispatch]);

  // Calculate stats
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'
  ).length;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="mt-2 text-gray-600">
          {user?.role === 'team_leader' || user?.role === 'admin' 
            ? 'Here\'s what\'s happening with your team.' 
            : 'Here are your current tasks and projects.'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Total Projects" 
          value={projects.length} 
          icon="folder" 
          color="primary" 
        />
        <StatsCard 
          title="Completed Tasks" 
          value={completedTasks} 
          icon="check-circle" 
          color="green" 
        />
        <StatsCard 
          title="Tasks In Progress" 
          value={inProgressTasks} 
          icon="refresh" 
          color="yellow" 
        />
        {overdueTasks > 0 && (
          <StatsCard 
            title="Overdue Tasks" 
            value={overdueTasks} 
            icon="exclamation" 
            color="red" 
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentProjects projects={projects.slice(0, 5)} />
        <TaskList 
          tasks={tasks.filter(t => t.assignedTo === user?._id).slice(0, 5)} 
          showProject={true}
          showActions={false}
          className="bg-white rounded-lg shadow p-4"
        />
      </div>
    </div>
  );
};

export default Dashboard;