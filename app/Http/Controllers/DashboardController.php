<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingTasks = Task::query()
        ->where('status', 'en_attente')
        ->count();
        $myPendingTasks = Task::query()
        ->where('status', 'en_attente')
        ->where('assigned_user_id', $user->id)
        ->count();

        $totalProgressTasks = Task::query()
        ->where('status', 'en_cours')
        ->count();
        $myProgressTasks = Task::query()
        ->where('status', 'en_cours')
        ->where('assigned_user_id', $user->id)
        ->count();

        $totalCompletedTasks = Task::query()
        ->where('status', 'terminé')
        ->count();
        $myCompletedTasks = Task::query()
        ->where('status', 'terminé')
        ->where('assigned_user_id', $user->id)
        ->count();

        $activeTasks = Task::query()
        ->whereIn('status', ['en_attente', 'en_cours'])
        ->where('assigned_user_id', $user->id)
        ->limit(10)
        ->get();

        $activeTasks = TaskResource::collection($activeTasks);
        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 
        'totalProgressTasks', 'myProgressTasks', 
        'totalCompletedTasks', 'myCompletedTasks', 'activeTasks'
    ));
    }
}
