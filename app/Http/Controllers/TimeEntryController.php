<?php

namespace App\Http\Controllers;

use App\Models\TimeEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TimeEntryController extends Controller
{
    public function index()
    {
        return Auth::user()->time_entries()->latest('id')->get();
    }

    public function store(TimeEntry $entry, Request $request)
    {
        $attributes = [
            'user_id' => Auth::id(),
            'task_id' => $request->input('task_id'),
            'started_at' => Carbon::now(),
            'stopped_at' => null,
            'comment' => $request->input('comment', ''),
        ];
        $entry->fill($attributes)->save();
        return response()->json($entry);
    }

    public function update(Request $request, $id)
    {
        $time = null;
        if ($request->has('stopped_at')) {
            $time = new Carbon($request->input('stopped_at'));
        }
        $entry = Auth::user()->time_entries()->findOrFail($id);
        $entry->update([
            'stopped_at' => $time,
        ]);
        return response()->json($entry);
    }
}
